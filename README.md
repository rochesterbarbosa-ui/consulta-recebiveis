# Consulta Recebíveis — Base de Pedidos

Esta versão registra automaticamente cada pedido em uma Google Planilha.

## Instalação

1. Crie uma Google Planilha.
2. Extensões > Apps Script.
3. Cole o conteúdo de `Code.gs`.
4. Salve e execute `setup` uma vez.
5. Implante > Nova implantação > Aplicativo da Web.
6. Executar como: você.
7. Quem tem acesso: qualquer pessoa.
8. Copie a URL `/exec`.
9. No `index.html`, preencha `const APP_SCRIPT_URL = "SUA_URL";`.
10. Envie o novo `index.html` ao GitHub Pages.

O registro inicial fica como AGUARDANDO PAGAMENTO. Para confirmação automática de PAGO será necessária uma API PIX com webhook.
