/* Fluxo ESCOLHER LENTES rodando DENTRO do provador real.
   Só o preview: o carrinho é simulado, nada vai pra loja.
   A leitura da receita é REAL (webhook n8n → Gemini vision). */
(function () {
    const $ = s => document.querySelector(s);
    const $$ = s => [...document.querySelectorAll(s)];

    const ARMACAO = { nome: 'Armação de Óculos de Grau Liz', preco: 274.00 };
    /* placeholder da foto gerada (no preview não rodamos o gerador) */
    const FOTO_RESULTADO = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="560">' +
        '<rect width="420" height="560" fill="#fff0f6"/>' +
        '<text x="210" y="270" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#d68ab4">sua foto</text>' +
        '<text x="210" y="296" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#d68ab4">com o óculos</text></svg>');
    const brl = v => 'R$ ' + v.toFixed(2).replace('.', ',');

    const st = { visao: null, trat: null, astig: null, receita: null };

    const TELAS = ['q-step-photo', 'q-step-pix', 'q-step-result', 'q-step-error',
        'q-step-lentes', 'q-step-receita', 'q-step-upload', 'q-step-lente-final', 'q-step-cart'];

    function ir(id) {
        TELAS.forEach(t => { const el = document.getElementById(t); if (el) el.style.display = 'none'; });
        const alvo = document.getElementById(id);
        if (alvo) alvo.style.display = 'flex';
        const sc = $('.q-content-scroll'); if (sc) sc.scrollTop = 0;
    }

    /* ---------- tela de resultado do provador (ponto de partida) ---------- */
    function montarResultado() {
        const img = $('#q-final-view-img');
        if (img) img.src = FOTO_RESULTADO;
        const fb = $('#q-fakebuy'); if (fb) fb.style.display = 'none';
        const info = $('#q-result-prodinfo');
        if (info) {
            info.style.display = 'block';
            $('#q-result-prodname').textContent = ARMACAO.nome;
            $('#q-result-prodprice').textContent = brl(ARMACAO.preco);
            const p = $('#q-result-installment');
            if (p) p.textContent = 'ou 6x de ' + brl(ARMACAO.preco / 6) + ' sem juros';
        }
        const seals = $('#q-seals'); if (seals) seals.style.display = 'flex';
    }

    /* ---------- selects da receita ---------- */
    function popular() {
        const faixa = (de, ate, passo) => {
            const o = ['<option value="">—</option>'];
            for (let v = de; v <= ate + 0.001; v += passo) {
                const s = (v > 0 ? '+' : '') + v.toFixed(2).replace('.', ',');
                o.push('<option value="' + v.toFixed(2) + '">' + s + '</option>');
            }
            return o.join('');
        };
        $$('[data-r$="Esf"]').forEach(s => s.innerHTML = faixa(-12, 7, 0.25));
        $$('[data-r$="Cil"]').forEach(s => { s.innerHTML = faixa(-6, 0, 0.25); s.value = '0.00'; });
        $$('[data-r="odEixo"],[data-r="oeEixo"]').forEach(s => {
            const o = ['<option value="">—</option>'];
            for (let v = 0; v <= 180; v++) o.push('<option value="' + v + '">' + v + '°</option>');
            s.innerHTML = o.join('');
        });
    }

    function limparReceita() {
        $$('[data-r]').forEach(s => { s.value = /Cil$/.test(s.dataset.r) ? '0.00' : ''; });
    }

    function lerCampos() {
        const g = k => { const el = $('[data-r="' + k + '"]'); return el && el.value !== '' ? Number(el.value) : null; };
        const r = {
            odEsf: g('odEsf'), odCil: g('odCil'), odEixo: g('odEixo'),
            oeEsf: g('oeEsf'), oeCil: g('oeCil'), oeEixo: g('oeEixo')
        };
        if (r.odEsf === null || r.oeEsf === null) return null;   // esférico é o mínimo
        r.odCil = r.odCil || 0; r.oeCil = r.oeCil || 0;
        return r;
    }

    /* ---------- recomendação ---------- */
    const TRAT_LABEL = {
        antirreflexo: 'Antirreflexo',
        blue: 'Antirreflexo + luz azul',
        fotocromatica: 'Fotocromática',
        fotocromatica_blue: 'Fotocromática + luz azul'
    };

    /* Grau fora da faixa da ótica: explica em português, sem número técnico solto. */
    const MOTIVO = {
        multifocal: 'Lente multifocal a gente monta sob medida pra cada pessoa.',
        esferico: 'Seu grau está acima do que deixamos pronto no site.',
        cilindrico: 'Seu astigmatismo está acima do que deixamos pronto no site.',
        // pediu um tratamento que não existe pro grau dela (ex.: fotocromática
        // com astigmatismo alto) — é falta de produto pronto, não grau fora
        tratamento: 'Esse tratamento a gente não deixa pronto pro seu grau.',
        sem_produto: 'Essa combinação a gente monta sob medida.'
    };

    function mostrarLente(rec) {
        if (!rec || rec.fora) {          // fora da faixa: não trava a venda, chama a ótica
            st.lente = null;
            $('#q-card-lente').innerHTML =
                '<div class="q-card-lente-nome">A gente monta a sua sob medida</div>' +
                '<div class="q-card-lente-mat">' + (MOTIVO[rec && rec.fora] || MOTIVO.sem_produto) + '</div>' +
                '<div class="q-card-lente-pq"><b>o que acontece agora</b>' +
                'Leve a armação e a nossa ótica te chama no WhatsApp pra fechar a lente certa ' +
                'pro seu grau — sem custo a mais pela consulta.</div>';
            $('#q-alternativas').innerHTML = '';
            $('#q-resumo-lente').textContent = '';
            $('#q-add-lente').textContent = 'LEVAR A ARMAÇÃO E FALAR COM A ÓTICA';
        } else {
            st.lente = rec.lente;
            pintarCard(rec.lente, rec.porque);
            $('#q-alternativas').innerHTML = '';
            const tipo = { simples: 'Visão simples', multifocal: 'Multifocal', descanso: 'Sem grau' }[st.visao];
            $('#q-resumo-lente').innerHTML = 'Você escolheu: ' + tipo + ' &middot; ' + (TRAT_LABEL[st.trat] || '—') +
                (rec.temAstig ? ' &middot; <strong>com astigmatismo</strong>' : '');
            $('#q-add-lente').textContent = 'ADICIONAR ARMAÇÃO + LENTE';
        }
        $('#q-form-receita').hidden = true;
        $('#q-resultado-lente').hidden = false;
        $('#q-lente-titulo').textContent = 'Sua lente indicada';
        ir('q-step-lente-final');
    }

    function pintarCard(l, porque) {
        $('#q-card-lente').innerHTML =
            (l.img ? '<img class="q-lente-foto" src="' + l.img + '" alt="" decoding="async">' : '') +
            '<div class="q-card-lente-nome">' + l.nome + '</div>' +
            '<div class="q-card-lente-mat">' + l.material + '</div>' +
            '<div class="q-card-lente-preco">' + brl(l.preco) + '</div>' +
            '<div class="q-card-lente-parc">ou 6x de ' + brl(l.preco / 6) + ' sem juros</div>' +
            (porque ? '<div class="q-card-lente-pq"><b>por que essa lente</b>' + porque + '</div>' : '') +
            '<div class="q-disclaimer">Indicação com base no que você escolheu, ' +
            '<strong>conferida pela nossa ótica</strong> antes da montagem.</div>';
    }

    function recomendarAgora() {
        mostrarLente(window.recomendar({ visao: st.visao, trat: st.trat, astig: st.astig, receita: st.receita }));
    }

    function abrirFormReceita(titulo, banner) {
        $('#q-form-receita').hidden = false;
        $('#q-resultado-lente').hidden = true;
        $('#q-lente-titulo').textContent = titulo;
        const b = $('#q-banner-ia');
        if (banner) { b.hidden = false; b.innerHTML = banner; } else { b.hidden = true; }
        ir('q-step-lente-final');
    }

    /* ---------- carrinho simulado ---------- */
    function carrinho(lente) {
        const linha = (n, v) =>
            '<div style="display:flex;justify-content:space-between;gap:10px;font-size:12.5px;padding:7px 0;">' +
            '<span>' + n + '</span><b>' + brl(v) + '</b></div>';
        let html = linha(ARMACAO.nome, ARMACAO.preco);
        let tot = ARMACAO.preco;
        if (lente) { html += linha(lente.nome, lente.preco); tot += lente.preco; }
        $('#q-cart-itens').innerHTML = html;
        $('#q-cart-total').textContent = brl(tot);
        ir('q-step-cart');
    }

    /* ---------- cliques ---------- */
    document.addEventListener('click', e => {
        const t = e.target.closest('[data-ir],[data-visao],[data-trat],[data-receita],[data-carrinho],' +
            '#q-btn-escolher-lentes,#q-btn-buy-now,#q-abrir-arquivo,#q-ver-lente,#q-add-lente');
        if (!t) return;
        e.preventDefault();

        if (t.id === 'q-btn-escolher-lentes') { ir('q-step-lentes'); return; }
        if (t.id === 'q-btn-buy-now') { carrinho(null); return; }
        if (t.dataset.ir) { if (t.dataset.ir === 'q-step-result') montarResultado(); ir(t.dataset.ir); return; }

        if (t.dataset.visao) {
            st.visao = t.dataset.visao;
            if (st.visao === 'descanso') { st.trat = 'blue'; st.astig = 'nao'; st.receita = null; recomendarAgora(); }
            else ir('q-step-receita');
            return;
        }
        if (t.dataset.trat) { st.trat = t.dataset.trat; ir('q-step-upload'); return; }

        if (t.id === 'q-abrir-arquivo') { $('#q-arquivo').click(); return; }

        if (t.dataset.receita === 'digitar') {
            limparReceita();
            abrirFormReceita('Digite sua receita', null);
            return;
        }

        if (t.id === 'q-ver-lente') {
            const r = lerCampos();
            if (!r) { alert('Preencha ao menos o esférico dos dois olhos.'); return; }
            st.receita = r; recomendarAgora(); return;
        }

        if (t.dataset.carrinho === 'sem') { carrinho(null); return; }

        if (t.id === 'q-add-lente') { carrinho(st.lente); return; }
    });

    /* ---------- leitura REAL da receita (n8n → Gemini vision) ---------- */
    const WEBHOOK_RECEITA = 'https://n8n.segredosdodrop.com/webhook/pl-ler-receita';

    /* Encaixa o valor lido no <select> mais próximo (os selects vão de 0,25 em 0,25). */
    function encaixar(sel, valor) {
        if (!sel || valor == null) return;
        const opts = [...sel.options].map(o => o.value).filter(v => v !== '');
        let melhor = opts[0], dif = Infinity;
        for (const o of opts) {
            const d = Math.abs(Number(o) - Number(valor));
            if (d < dif) { dif = d; melhor = o; }
        }
        sel.value = melhor;
    }

    $('#q-arquivo').addEventListener('change', e => {
        const f = e.target.files && e.target.files[0];
        if (f) lerReceitaDoArquivo(f);
    });

    async function lerReceitaDoArquivo(file) {
        $('#q-erro-leitura').hidden = true;
        $('#q-lendo').hidden = false;
        $('#q-arq-nome').textContent = file.name;
        const th = $('#q-thumb');
        if (/^image\//.test(file.type)) {
            th.src = URL.createObjectURL(file); th.hidden = false;
            th.onload = () => URL.revokeObjectURL(th.src);
        } else { th.hidden = true; }     // PDF: sem miniatura

        try {
            const b64 = await new Promise((ok, err) => {
                const fr = new FileReader();
                fr.onload = () => ok(String(fr.result).split(',')[1]);
                fr.onerror = err;
                fr.readAsDataURL(file);
            });

            const resp = await fetch(WEBHOOK_RECEITA, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: b64, mime: file.type || 'image/png' })
            });
            const r = await resp.json();

            if (!r.ok) {
                falhaLeitura(r.erro === 'nao_e_receita'
                    ? 'Não identifiquei uma receita nessa imagem.'
                    : 'Não consegui ler sua receita.');
                return;
            }

            const d = r.dados;
            encaixar($('[data-r="odEsf"]'), d.odEsf); encaixar($('[data-r="oeEsf"]'), d.oeEsf);
            encaixar($('[data-r="odCil"]'), d.odCil); encaixar($('[data-r="oeCil"]'), d.oeCil);
            if (d.odEixo != null) $('[data-r="odEixo"]').value = String(Math.round(d.odEixo));
            if (d.oeEixo != null) $('[data-r="oeEixo"]').value = String(Math.round(d.oeEixo));

            $('#q-lendo').hidden = true;
            // o lido SEMPRE cai nos campos pra cliente conferir: receita é manuscrita, a IA erra número
            abrirFormReceita('Confira sua receita', d.confianca === 'baixa'
                ? '&#9888;&#65039; A imagem ficou difícil de ler. <strong>Confira cada número com atenção.</strong>'
                : '&#10024; Preenchemos com o que lemos na sua receita. <strong>Confira e corrija se precisar.</strong>');

        } catch (err) {
            falhaLeitura('A leitura falhou — pode ser a conexão.');
        }
    }

    /* Falha na leitura nunca trava a venda: tentar de novo ou digitar. */
    function falhaLeitura(msg) {
        $('#q-lendo').hidden = true;
        const box = $('#q-erro-leitura');
        box.innerHTML = msg + ' Tente outra foto ou <a data-receita="digitar">digite os dados</a>.';
        box.hidden = false;
    }

    popular();
    montarResultado();
    ir('q-step-result');
})();
