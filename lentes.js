/* ==========================================================================
   ESCOLHER LENTES — regras da ótica + catálogo real da loja

   As REGRAS são da Maxilook. Cada faixa diz que grau o laboratório atende
   pronto e quais lentes servem, por tratamento escolhido.

   ORDEM IMPORTA: vale a PRIMEIRA faixa em que o grau couber (esférico E
   cilíndrico). Por isso a resina padrão vem antes do policarbonato — quem
   cabe na 1.56 leva a mais em conta; o poli entra quando o grau passa de 4.

   1  padrão         esf ±4,00 · cil até 2,00   resina 1.56
   2  astigmatismo   esf ±4,00 · cil até 4,00   resina p/ astigmatismo
   3  policarbonato  esf ±5,00 · cil até 2,00   policarbonato 1.59
   4  poli astig.    esf ±5,00 · cil até 4,00   policarbonato p/ astigmatismo

   Fora de todas, multifocal, ou tratamento que não existe na faixa:
   não indicamos. A ótica monta sob medida e chama no WhatsApp.
   Melhor não vender do que vender errado.

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

const FAIXAS = [
  {
    nome: 'padrão', material: 'resina 1.56',
    esfMax: 4.00, cilMax: 2.00,
    lentes: {
      antirreflexo:       '316444407',  // Básicas 1.56 c/ AR                R$ 129
      blue:               '314902019',  // Básicas 1.56 AR + Anti Blue       R$ 199
      fotocromatica:      '332987251',  // Fotocromáticas c/ AR              R$ 249
      fotocromatica_blue: '339075492',  // Fotocromáticas Anti Blue c/ AR    R$ 459
    }
  },
  {
    nome: 'astigmatismo', material: 'resina para astigmatismo',
    esfMax: 4.00, cilMax: 4.00,
    lentes: {
      antirreflexo:       '337827069',  // AR Para Astigmatismo              R$ 199
      blue:               '339014487',  // Anti Blue AR Para Astigmatismo    R$ 279
      // fotocromática não existe nesta faixa
    }
  },
  {
    nome: 'policarbonato', material: 'policarbonato 1.59',
    esfMax: 5.00, cilMax: 2.00,
    lentes: {
      antirreflexo:       '314902090',  // Poli 1.59 c/ AR                   R$ 229
      blue:               '314902030',  // Poli 1.59 AR + Anti Blue          R$ 269
      fotocromatica_blue: '332085529',  // Poli 1.59 Fotossensível AR+Blue   R$ 599
      // fotocromática sem anti blue não existe em policarbonato
    }
  },
  {
    nome: 'policarbonato astigmatismo', material: 'policarbonato para astigmatismo',
    esfMax: 5.00, cilMax: 4.00,
    lentes: {
      antirreflexo: '339012891',  // Poli c/ AR Para Astigmatismo        R$ 379
      blue:         '339013853',  // Poli Anti Blue AR Para Astigmatismo R$ 499
      // fotocromática não existe nesta faixa
    }
  },
];

/* --------------------------------------------------------------------------
   A receita serve para UMA coisa: achar a faixa. Não escolhemos material,
   índice nem espessura — isso é do laboratório.
-------------------------------------------------------------------------- */

/** Pior olho: maior módulo, preservando o sinal. */
function piorOlho(a, b) { return Math.abs(a) >= Math.abs(b) ? a : b; }

/** Grau dos dois olhos, já em módulo. Sem receita (descanso) = zerado. */
function grau(receita) {
  if (!receita) return { esf: 0, cil: 0 };
  return {
    esf: Math.abs(piorOlho(Number(receita.odEsf) || 0, Number(receita.oeEsf) || 0)),
    cil: Math.max(Math.abs(Number(receita.odCil) || 0), Math.abs(Number(receita.oeCil) || 0))
  };
}

const cabe = (g, f) => g.esf <= f.esfMax && g.cil <= f.cilMax;

/**
 * @param {{visao:string, trat:string, receita:object|null}} e
 * @returns {{lente, porque, temAstig, faixa}}                      indicação
 *        | {fora:'multifocal'|'esferico'|'cilindrico'|'tratamento'}  → ótica
 */
function recomendar(e) {
  // As regras cobrem monofocal. Multifocal ainda não tem faixa definida.
  if (e.visao === 'multifocal') return { fora: 'multifocal' };

  const g = grau(e.receita);

  // Primeira faixa que couber no esférico E no cilíndrico.
  const faixa = FAIXAS.find(f => cabe(g, f));
  if (!faixa) {
    // Nenhuma serve: explica qual dos dois estourou. Se existe faixa que
    // aceita esse cilíndrico, então o problema é o esférico.
    const cilOk = FAIXAS.some(f => g.cil <= f.cilMax);
    return cilOk ? { fora: 'esferico', valor: g.esf }
                 : { fora: 'cilindrico', valor: g.cil };
  }

  const id = faixa.lentes[e.trat];
  // O tratamento pode não existir na faixa (ex.: fotocromática com
  // astigmatismo alto). É falta de produto pronto, não grau fora.
  if (!id) return { fora: 'tratamento', faixa: faixa.nome };

  const lente = LENTES.find(l => l.id === id);
  if (!lente) return { fora: 'sem_produto' };

  return { lente, temAstig: g.cil > 0, faixa: faixa.nome, porque: porque(e.trat, g) };
}

/** Explica com base na escolha e no grau — sem prometer o que é da ótica. */
function porque(trat, g) {
  const p = [];
  if (trat === 'fotocromatica' || trat === 'fotocromatica_blue')
    p.push('escurece no sol e clareia dentro de casa');
  else p.push('com antirreflexo');
  if (trat === 'blue' || trat === 'fotocromatica_blue')
    p.push('filtra a luz azul das telas');
  if (g.cil > 0) p.push('e corrige o seu astigmatismo');
  return 'Seu grau está na faixa que a gente monta pronto. Esta lente vem '
       + p.join(', ') + '.';
}

if (typeof window !== 'undefined') {
  window.LENTES = LENTES; window.FAIXAS = FAIXAS; window.recomendar = recomendar;
}
if (typeof module !== 'undefined') {
  module.exports = { LENTES, FAIXAS, recomendar, grau };
}
