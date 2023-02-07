module.exports =  function optionName(name) {
    const botInfo =  "COMPROmilhas_Bot"
  
    return {
      reply_markup: {
        inline_keyboard: [
          [{ text: ` Vender`, url: `https://t.me/${name}` }, { text: "Comprar", url:`https://t.me/${botInfo}?start=comprar` },
        {text : ` Menu`, url: `https://t.me/${botInfo}?start=menu`}]
        ]
      }
    }
  };
