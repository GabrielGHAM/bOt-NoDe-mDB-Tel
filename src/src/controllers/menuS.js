const Telegraf = require('telegraf');
const { Markup } = require('telegraf');
const getHiddenLink = require('./imgFormat');

module.exports = function startMenu(ctx, Markup, client) {

    const userFirstName = ctx.chat.first_name;
    const botInfo = ctx.botInfo.username;

    ctx.replyWithHTML(` Olá <b> ${userFirstName}</b> Seja bem vindo ao <b>@${botInfo}</b>\n` +

        `${getHiddenLink("HTML")}`

        ,
        Markup.inlineKeyboard([

            [
                Markup.callbackButton('Outras opções', 'other'),
            ],
            [
                Markup.callbackButton('Oferta de compra', 'comprar'),
            ],
        ])
            .resize()
            .extra()

    );


    client.action('regras', ctx => {

        ctx.editMessageText(`<b> REGRAS NO GRUPO <i>COMPROmilhas</i>. </b>\n\n` +
            `Toda e qualquer atitude identificada como falta de ética \n ` +
            `deve ser comunicada à liderança do grupo (admin e moderador)\n` +
            `para ser avaliada. Caso se confirme o comportamento antiético \n ` +
            `relatado, a pessoa será banida imediatamente do grupo.\n\n` +
            `<b>SOBRE AS POSTAGEM NO GRUPO:</b>\n\n` +
            `Só serão permitidas ofertas de compras e \n` +
            `confirmações de vendas dentro do grupo.\n\n` +
            `Usamos #hashtags para melhor localização dos interesses de compra.\n\n` +
            `• Exemplos:\n` +
            `• Quer comprar?\n` +
            `• #compro #100k #latam #29,00 #3cpf\n` +
            `• Vendeu?\n` +
            `• #venda realizada com sucesso @nomedovendedor #valor da negociação fechada #recomendaçãodovendedor\n\n` +
            `• <b>Não é permitido:</b>\n` +
            `• Escrever dentro do grupo  “Aceito, Pv, Fila, Eu, tenho”\n` +
            `ou qualquer outra coisa que não seja a permitida.\n` +
            `• Dar lance de venda ou desagio” dentro da oferta do comprador no grupo, somente no privado.\n` +
            `• Oferta de venda de qualquer produto no grupo.\n` +
            `• Oferta de compras de AME, IFOOD ou qualquer outro produto que não seja ligada com \n` +
            `milhas aéreas e pontos, não vamos perder o foco das milhas e pontos.\n\n` +
            `• <b>Obrigações e deveres do comprador:</b>\n` +
            `• Responder aos vendedores imediatamente ou colocar na oferta de #compra\n` +
            ` que já está sendo negociada a mesma, “#emnegociação “ pois isso evita que o\n` +
            ` comprador fique recebendo muitas propostas no privado e não consiga responde-las.\n` +
            `• Pagar o valor combinado dentro do prazo sem causar problemas para o vendedor.\n` +
            `• Manter o número do telefone atualizado com o vendedor assim como WhatsApp\n` +
            ` e Telegram para que possa ser encontrado.\n` +
            `• Obrigações e deveres do vendedor:\n` +
            `• Emitir a passagem conforme combinado.\n` +
            `• Passar todos os dados de acesso para o comprador conforme solicitado para o mesmo fazer a emissão.\n` +
            `• Se as milhas ou pontos não forem utilizadas no total ou em caso de algum cancelamento deixar \n` +
            `combinado com o comprador um prazo para utilização das mesmas.\n` +
            `• Se acontecer de trocar a senha de acesso informar a nova senha ao comprador.\n` +
            `• Manter o número do telefone atualizado com o comprador assim como WhatsApp e Telegram para que possa ser encontrado.\n` +
            `As demais obrigações e deveres entre vendedores e compradores precisam ser esclarecidas na hora da negociação.\n\n` +
            `• <b>Exemplos:</b>\n` +
            `• Caso haja algum imprevisto como fica a devolução do dinheiro?\n` +
            `• Se for cancelado uma passagem da Azul como fica o uso do cpf, tem uma multa por usar o beneficiário?\n` +
            `• As milhas ficarão disponível para usar na azul no mesmo cpf ou na interline?\n` +
            `• O que fazer com sobras e saldos de milhas na conta do vendedor?\n` +
            `• O exemplo acima é da Azul porém serve para as outras cias com os mesmos sistemas de limites de cpfs por beneficiário.\n` +
            `• Tudo que é combinado fica mais suave de negociar.\n\n` +
            `<b>TODAS</b> as transações de milhas realizadas dentro do grupo "COMPRO MILHAS"\n` +
            `são de inteira responsabilidade entre os compradores e vendedores.\n\n` +
            `Essas regras têm o único objetivo de preservar a organização do grupo "COMPRO MILHAS" e \n` +
            `poderão ser alteradas a qualquer momento pelo administrador principal do grupo.\n\n` +
            `Nosso objetivo é manter o grupo coeso e justo, para que todos tenham resultados satisfatório em suas transações\n` +
            `pois, em nosso grupo “COMPRO MILHAS”, estão os maiores e melhores milheiros do país.\n\n` +
            `Boas negociações!\n\n` +
             `<b>Natan Amaral</b>\n`+
           `<b>Adm </b>`+
         `${getHiddenLink(`HTML`)}`,
          {
                parse_mode: `HTML`,
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Voltar', callback_data: 'menuPrincipal' }
                        ]
                    ]
                }
            })
    });

    client.action('other', ctx => {
        ctx.editMessageText(
            `<b>${userFirstName} </b>, seja bem-vindo(a) ao menu de Outras opções!\n\n` +
            `${getHiddenLink("HTML")}`,
            {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Fale com o ADM', url: 'https://t.me/nsamaral' }
                        ],
                        [{ text: 'Indicações ao GRUPO', url: 'http://bit.ly/form-compromilhas' }
                        ],
                        [{ text: 'Nossas REGRAS', callback_data: 'regras' }
                        ],
                        [{ text: 'Voltar', callback_data: 'menuPrincipal' }
                        ]

                    ]
                }
            })
    });


    client.action('menuPrincipal', ctx => {
        ctx.editMessageText(`Olá <b> ${ userFirstName }</b>, seja bem vindo ao <b>@${ botInfo } </b>\n\n` +
            `${ getHiddenLink("HTML") } `, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [

                    [
                        { text: 'Outras opções', callback_data: 'other' },
                    ],
                    [
                        { text: 'Oferta de compra', callback_data: 'comprar' },
                    ]
                ]
            }
        })
    });
    client.action('comprar', ctx => {

        ctx.scene.enter('comprar');

    })
        ;
}