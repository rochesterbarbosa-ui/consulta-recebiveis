const SHEET_NAME = "Pedidos";

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Data","Pedido","Nome","Processo","Valor","Status","Origem"]);
    sh.setFrozenRows(1);
    sh.getRange(1,1,1,7).setFontWeight("bold");
  }
}

function doGet() {
  setup();
  return ContentService.createTextOutput(JSON.stringify({
    ok:true, service:"Consulta Recebíveis"
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  setup();
  try {
    const d = JSON.parse(e.postData.contents || "{}");
    const pedido = String(d.pedido || "").trim();
    const nome = String(d.nome || "").trim();
    const processo = String(d.processo || "").trim();
    if (!pedido || !nome || !processo) return json({ok:false,error:"Dados obrigatórios ausentes"});

    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const values = sh.getDataRange().getValues();
    for (let i=1;i<values.length;i++) {
      if (String(values[i][1]) === pedido) return json({ok:true,duplicado:true,pedido:pedido});
    }

    sh.appendRow([
      new Date(), pedido, nome, processo, 29.90,
      "AGUARDANDO PAGAMENTO", "Consulta Recebíveis"
    ]);
    return json({ok:true,pedido:pedido,status:"AGUARDANDO PAGAMENTO"});
  } catch(err) {
    return json({ok:false,error:String(err)});
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
