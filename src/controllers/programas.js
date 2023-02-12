
module.exports = function programas(ctx) {
    ctx.reply(` Qual o programa?`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Smiles',
                            callback_data: 'smiles'
                        },
                        {
                            text: 'Smiles Teto Diamante',
                            callback_data: 'smiles_diamante'
                        }
                    ],
                    [
                        {
                            text: 'TAP',
                            callback_data: 'tap'
                        },
                        {
                            text: 'TAP Voucher',
                            callback_data: 'tap_voucher'
                        }
                    ],
                    [
                        {
                            text: 'Latam Wallet',
                            callback_data: 'latam_wallet'
                        },
                        {
                            text: 'Latam',
                            callback_data: 'latam'
                        }
                    ],
                    [
                        {
                            text: 'Azul Voucher RT',
                            callback_data: 'azul_voucher'
                        },
                        {
                            text: 'Azul Interline',
                            callback_data: 'azul_interline'
                        }
                    ],
                    [
                        {
                            text: 'Avios Ibéria',
                            callback_data: 'avios_iberia'
                        },
                        {
                            text: 'AeroMéxico',
                            callback_data: 'aeromexico'
                        }
                    ],
                    [
                        {
                            text: 'Volta Cancelada',
                            callback_data: 'volta_cancelada'
                        },
                        {
                            text: 'United',
                            callback_data: 'united'
                        }
                    ],
                    [
                        {
                            text: 'AmericanAirline',
                            callback_data: 'american_airline'
                        },
                        {
                            text: 'Outros',
                            callback_data: 'outros'
                        }
                    ]
                ]
            }
        }
    );
}