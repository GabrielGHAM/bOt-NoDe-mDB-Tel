const Telegraf = require('telegraf');
function getHiddenLink(url, parse_mode = "markdown") {
    const emptyChar = "‎"; // copied and pasted the char from https://emptycharacter.com/

    switch (parse_mode) {
        case "markdown":
            return `[${emptyChar}](${url})`;
        case "HTML":
            return `<a href="${url}">${emptyChar}</a>`;
        case "markdownV2":
            return `[${emptyChar}](${url})`;
        default:
            throw new Error("invalid parse_mode");
    }
}


module.exports = function startMenu(ctx, Markup, client) {


    const userFirstName = ctx.message.from.first_name;


    ctx.replyWithHTML(` <b>Olá  ${userFirstName} Seja bem vindo ao  @COMPROmilhas_Bot </b>\n` +
   

        `${getHiddenLink("https://i.imgur.com/ORHMwRY.jpg", "HTML")}`

        ,
        Markup.inlineKeyboard([

            [
                Markup.callbackButton('Outras opções', 'other'),
            ],
            [
                Markup.callbackButton('Oferta de compra', 'comprar'),
            ],
        ])

            .extra()

    );


    client.action('regras', ctx => {

        ctx.editMessageText(`* Olá  _${userFirstName}_\\,  essas são as regras *\n\n` +
            '*Para melhorar nossa segurança e promover o potencial mercado de milhas em nosso grupo\\, seguem algumas regras importantes sobre a inclusão de novas pessoas e também sobre ética nos negócios dentro do grupo:*\n\n' +
            '*Toda inclusão deve ser feita por indicação de um membro do grupo que tenha realizado "NO MÍNIMO 10 TRANSAÇÕES" de COMPRA OU VENDA dentro do grupo e ainda ficando este como avalista do indicado\\.*\n' +
            '*A inclusão se dará por este formulário específico*\n\n' +
            '*Muito cuidado ao indicar qualquer pessoa para o grupo\\! Caso o indicado venha a dar “prejuízos financeiros” a alguém do grupo, o banimento será imediato, tanto do indicado como da pessoa que o indicou \\(avalista\\)\\.*\n\n' +
            '*Para o indicador “avalista” não ser banido do grupo junto com o indicado \\, o mesmo deverá assumir o prejuízo financeiro causado pelo indicado junto à pessoa prejudicada\\.*\n\n' +
            '*O administrador principal e os moderadores poderão a qualquer momento aprovar ou não a indicação ao grupo\\.*\n\n' +
            '*ETÍCA NO GRUPO*\n\n' +
            '*Toda e qualquer atitude identificada como falta de ética deve ser comunicada à liderança do grupo \\(admin e moderador\\) para ser avaliada\\. Caso se confirme o comportamento antiético relatado\\, a pessoa será banida imediatamente do grupo\\.*\n\n' +
            '*SOBRE AS POSTAGEM NO GRUPO*\n\n' +
            '*Só serão permitidas ofertas de compra de milhas e confirmações de vendas efetuada\\.*\n' +
            '*Usamos hashtags ou o bot \\(\\/comprar\\) para melhor localização dos interesses de compra\\.*\n\n' +
            '*Exemplos:*\n\n' +
            '*Quer comprar\\? *\n' +
            '*\\#compro \\#100k \\#latam \\#29,00 \\#3cpf\n\n*' +
            '*Vendeu?\\#venda realizada com sucesso @nomedovendedor \\#valor da negociação fechada \\#recomendaçãodovendedor*\n\n' +
            '*TODAS as transações de milhas realizadas dentro do grupo *\n\n' +
            `***_Natan Amaral_***  ${getHiddenLink("https://i.imgur.com/ORHMwRY.jpg", "markdown")}`,
            {
                parse_mode: "MarkdownV2",
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Voltar', callback_data: 'menu' }
                        ]
                    ]
                }
            })
    });

    client.action('other', ctx => {
        ctx.editMessageText(
            `*  _${userFirstName}_\\, seja bem\\-vindo\\(a\\) ao menu de Outras opções\\! ***\n\n` +
            `${getHiddenLink("https://i.imgur.com/ORHMwRY.jpg", "markdown")}`,
            {
                parse_mode: "MarkdownV2",
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Falar com ADM', url: 'https://t.me/nsamaral' }
                        ],
                        [{ text: 'Indicações ao GRUPO', url: 'http://bit.ly/form-compromilhas' }
                        ],
                        [{ text: 'Nossas REGRAS', callback_data: 'regras' }
                        ],
                        [{ text: 'Voltar', callback_data: 'menu' }
                        ]

                    ]
                }
            })
    });


    client.action('menu', ctx => {


        ctx.editMessageText(`<b>Olá ♔ ${userFirstName} Seja bem vindo ao  @COMPROmilhas_Bot </b>\n` +

            `${getHiddenLink("https://i.imgur.com/ORHMwRY.jpg", "HTML")}`, {
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

    ;