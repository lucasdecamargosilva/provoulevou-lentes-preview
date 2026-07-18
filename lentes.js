/* ==========================================================================
   ESCOLHER LENTES — regra da ótica + catálogo real da loja

   A REGRA é da Maxilook, não nossa. Ela define uma faixa que o laboratório
   atende pronto, e as 4 lentes recomendadas dentro dela:

       Monofocal (só longe OU só perto)
       Esférico   +4,00 a -4,00
       Cilíndrico  0,00 a  2,00

   Dentro da faixa → indica pelo tratamento escolhido (4 opções abaixo).
   Fora da faixa, ou multifocal → não indicamos nada: a ótica monta sob medida
   e fala com a cliente no WhatsApp. Melhor não vender do que vender errado.

   Preço, foto e variantId vêm da API da Nuvemshop (gera_lentes.py).
   Loja: Ótica Maxilook (7085367) · catálogo de 18/07/2026
   ========================================================================== */

const LENTES = [
  { id: '314902021', variantId: '1394843279', preco: 99.00, visao: 'simples', astig: false, blue: false, foto: false, ar: false, material: 'Resina 1.49',
    nome: "Par de Lentes Básicas Monofocais 1.49 Simples",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/b8720750ff397acab175f66ac1ec099d-ac6fa6b1f930a426ad17665862938442-1024-1024.png' },
  { id: '314902025', variantId: '1394843293', preco: 129.00, visao: 'simples', astig: false, blue: false, foto: false, ar: false, material: 'Policarbonato 1.59',
    nome: "Par de Lentes Monofocais Policarbonato 1.59 Incolor",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/82e4eaaf994f0739da9fb920f4b9488c-76324b8fcb97f508c917665862962082-1024-1024.png' },
  { id: '316444407', variantId: '1402072714', preco: 129.00, visao: 'simples', astig: false, blue: false, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-3bd8157aaf4b7b7e6517677169905182-1024-1024.png' },
  { id: '314902019', variantId: '1394843261', preco: 199.00, visao: 'simples', astig: false, blue: true, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais com Antirreflexo e Filtro de Luz Azul",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/a582a00d3cea56eb6681744f5df73075-a9b0745ce3fbdac06317665862911781-1024-1024.png' },
  { id: '337827069', variantId: '1501636642', preco: 199.00, visao: 'simples', astig: true, blue: false, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais com Antirreflexo Para Astigmatismo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-37e3ff589a4cc7932817765306975313-1024-1024.png' },
  { id: '314902090', variantId: '1394843592', preco: 229.00, visao: 'simples', astig: false, blue: false, foto: false, ar: true, material: 'Policarbonato 1.59',
    nome: "Par de Lentes Monofocais Policarbonato 1.59 com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/88e4fb851dcf0220d5364effe678a109-14d23cdb36d1d19d4517665863352021-1024-1024.png' },
  { id: '332987251', variantId: '1481022455', preco: 249.00, visao: 'simples', astig: false, blue: false, foto: true, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais Fotocromáticas com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-85578699c51593636f17740368397056-1024-1024.png' },
  { id: '314902030', variantId: '1394843312', preco: 269.00, visao: 'simples', astig: false, blue: true, foto: false, ar: true, material: 'Policarbonato 1.59',
    nome: "Par de Lentes Monofocais Policarbonato 1.59 com Antirreflexo + Anti Blue",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/7a598bb30d8f2c69255ac008f4361a42-939c63a6b1cf03d55317665862987033-1024-1024.png' },
  { id: '339014487', variantId: '1506792037', preco: 279.00, visao: 'simples', astig: true, blue: true, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais Anti Blue com Antirreflexo Para Astigmatismo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-ef3e75b613513ec7e017765406647142-1024-1024.png' },
  { id: '339016108', variantId: '1506796380', preco: 279.00, visao: 'simples', astig: false, blue: false, foto: false, ar: false, material: 'Resina 1.49',
    nome: "Par de Lentes Monofocais 1.49 com Coloração",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/b8720750ff397acab175f66ac1ec099d-db1799dd1e0c85ac9b17765412817028-1024-1024.png' },
  { id: '314902055', variantId: '1394843394', preco: 359.00, visao: 'multifocal', astig: false, blue: false, foto: false, ar: false, material: 'Resina 1.49',
    nome: "Par de Lentes Básicas Multifocais 1.49 Básicas",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/598edcb5f934d82024fe88f6cb716dec-b109146f1408e0f37417665863115205-1024-1024.png' },
  { id: '339012891', variantId: '1506789048', preco: 379.00, visao: 'simples', astig: true, blue: false, foto: false, ar: true, material: 'Policarbonato',
    nome: "Par de Lentes Monofocais em Policarbonato com Antirreflexo Para Astigmatismo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-75774b6ca49d7ae64317765402503463-1024-1024.png' },
  { id: '314902058', variantId: '1394843416', preco: 429.00, visao: 'multifocal', astig: false, blue: false, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Multifocais com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/7347a339b4fb1bb1ae9eea52598fbd9d-ba7d27f7650e1391be17665863141874-1024-1024.png' },
  { id: '339075492', variantId: '1506994245', preco: 459.00, visao: 'simples', astig: false, blue: true, foto: true, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais Fotocromáticas Anti Blue com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-6c1c35ad074dedfd0417766075290673-1024-1024.png' },
  { id: '314902033', variantId: '1394843333', preco: 499.00, visao: 'simples', astig: false, blue: false, foto: false, ar: true, material: 'Resina 1.67',
    nome: "Par de Lentes Monofocais Finas 1.67 com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/c6acbfb4202858febf09c4f1564dd3f3-57f25ec4f2894d49dc17665863011590-1024-1024.png' },
  { id: '339013853', variantId: '1506790764', preco: 499.00, visao: 'simples', astig: true, blue: true, foto: false, ar: true, material: 'Policarbonato',
    nome: "Par de Lentes Monofocais em Policarbonato Anti Blue com Antirreflexo Para Astigmatismo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-59cba298e5b7cbaadc17765404984171-1024-1024.png' },
  { id: '314902038', variantId: '1394843351', preco: 599.00, visao: 'simples', astig: false, blue: true, foto: false, ar: true, material: 'Resina 1.67',
    nome: "Par de Lentes Monofocais Finas 1.67 com Antirreflexo + Anti Blue",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/bffc1487950bd438b6c159acd7281ae5-c2cb963d16918e178c17665863035746-1024-1024.png' },
  { id: '314902067', variantId: '1394843443', preco: 599.00, visao: 'multifocal', astig: false, blue: true, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Multifocais com Antirreflexo e Filtro de Luz Azul",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/926c5f17668b9f4529d95fa8010e0918-d2f717fc83813a9d5e17665863166633-1024-1024.png' },
  { id: '332085529', variantId: '1477754416', preco: 599.00, visao: 'simples', astig: false, blue: true, foto: true, ar: true, material: 'Policarbonato 1.59',
    nome: "Par de Lentes Monofocais Policarbonato 1.59 Fotossensível com Antirreflexo + Anti Blue",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-9dfb2e7042f2989a6017737642894358-1024-1024.png' },
  { id: '314902042', variantId: '1394843363', preco: 999.00, visao: 'simples', astig: false, blue: false, foto: false, ar: true, material: 'Resina 1.74',
    nome: "Par de Lentes Monofocais Super Finas 1.74 com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/d73ba502a7c113c71cbf003cdf2c9beb-bb3bb10e4dcc1e3a1c17665863062169-1024-1024.png' },
  { id: '314902045', variantId: '1394843373', preco: 1399.00, visao: 'simples', astig: false, blue: true, foto: false, ar: true, material: 'Resina 1.74',
    nome: "Par de Lentes Monofocais Super Finas 1.74 com Antirreflexo + Anti Blue",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/b2469a1ba286035bdb983625ed0c6a28-7594fd160dcc83d13917665863090289-1024-1024.png' },
];

/* A faixa que a ótica atende pronto. Cilíndrico comparado em módulo. */
const FAIXA = { esfMin: -4.00, esfMax: 4.00, cilMax: 2.00 };

/* As 4 recomendações da ótica, por tratamento escolhido. */
const RECOMENDACAO = {
  antirreflexo:       '316444407',   // Básicas 1.56 com Antirreflexo
  blue:               '314902019',   // Básicas 1.56 Antirreflexo + Anti Blue
  fotocromatica:      '332987251',   // Fotocromáticas com Antirreflexo
  fotocromatica_blue: '339075492',   // Fotocromáticas Anti Blue com Antirreflexo
};

/* --------------------------------------------------------------------------
   A receita serve para UMA coisa: dizer se o grau cabe na faixa da ótica.
   Não escolhemos material, índice nem espessura — isso é do laboratório.
-------------------------------------------------------------------------- */

/** Confere os dois olhos contra a faixa. Devolve o motivo quando não cabe. */
function dentroDaFaixa(receita) {
  if (!receita) return { ok: true };            // sem grau (descanso): nada a conferir

  const esfs = [Number(receita.odEsf) || 0, Number(receita.oeEsf) || 0];
  const cils = [Math.abs(Number(receita.odCil) || 0), Math.abs(Number(receita.oeCil) || 0)];

  const piorEsf = esfs.reduce((a, b) => Math.abs(a) >= Math.abs(b) ? a : b);
  const piorCil = Math.max(...cils);

  if (piorEsf < FAIXA.esfMin || piorEsf > FAIXA.esfMax)
    return { ok: false, motivo: 'esferico', valor: piorEsf };
  if (piorCil > FAIXA.cilMax)
    return { ok: false, motivo: 'cilindrico', valor: piorCil };

  return { ok: true, piorEsf, piorCil };
}

/**
 * @param {{visao:string, trat:string, receita:object|null}} e
 * @returns {{lente, porque, temAstig}}          indicação normal
 *        | {fora:'multifocal'|'esferico'|'cilindrico', valor?}   → ótica
 */
function recomendar(e) {
  // A regra da ótica cobre monofocal. Multifocal ainda não tem faixa definida.
  if (e.visao === 'multifocal') return { fora: 'multifocal' };

  const faixa = dentroDaFaixa(e.receita);
  if (!faixa.ok) return { fora: faixa.motivo, valor: faixa.valor };

  const lente = LENTES.find(l => l.id === RECOMENDACAO[e.trat]);
  if (!lente) return { fora: 'sem_produto' };

  return {
    lente,
    temAstig: (faixa.piorCil || 0) > 0,
    porque: porque(e.trat, faixa)
  };
}

/** Explica com base na escolha e no grau — sem prometer o que é da ótica. */
function porque(trat, faixa) {
  const p = [];
  if (trat === 'fotocromatica' || trat === 'fotocromatica_blue')
    p.push('escurece no sol e clareia dentro de casa');
  else p.push('com antirreflexo');
  if (trat === 'blue' || trat === 'fotocromatica_blue')
    p.push('filtra a luz azul das telas');
  if (faixa.piorCil > 0) p.push('e atende o seu astigmatismo');
  return 'Seu grau está na faixa que a gente monta pronto. Esta lente vem '
       + p.join(', ') + '.';
}

if (typeof window !== 'undefined') {
  window.LENTES = LENTES; window.recomendar = recomendar;
  window.FAIXA = FAIXA; window.dentroDaFaixa = dentroDaFaixa;
}
if (typeof module !== 'undefined') {
  module.exports = { LENTES, FAIXA, RECOMENDACAO, recomendar, dentroDaFaixa };
}
