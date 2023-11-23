import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const usuarioSchema = new mongoose.Schema({
    perfil:{
        src: {
            type: String,
            default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAP1BMVEX///+ZmZmWlpaenp67u7uTk5P7+/uQkJDw8PD39/e/v7+4uLjj4+PJycmmpqaioqLq6uqwsLDc3NzPz8/V1dU6g2sDAAAEO0lEQVR4nO2b3XKjMAyF1zL+N2Ab3v9Z16RN2rQQDBxIL3ymnZ3Zi8wXSZYlWf33r6qqqqqqakZSB+998j5o826WD5mxiT1nxCj/MNZHN4Q3EyXbCSUyzJdIKNW7Ub8JSYa2o2eih4TgNr3BmdI7toB0B4vj1Vw+8ldIH76kbriSyVhaZfqIsegvgxrX7fTF1V7jRtOqYqgs1V1xHEMnNjBN5uLnR1fiG6FuXjwbim3x3l3CnQo17oLKwdWcCJVe5s03WcvvRLphnRVbYaf7TsWSW1PCs0icUuA0h6AyVn9COk3qGNQpEa/L775FqRFNZY9DMerAN7UHQGUfWixVA6FiHBrwR/Lnd2GTljuYFe6CZodwOCvchTRWCzLVdAxhUKbHxPokAWsvPMyByOSAivWbelQm7XAOzMYClQ4BCcUU6BQmKBVFDBXiYv4mLhFQ0mGpCJLeDTTYMxUkY+keCsUIUvsFLBQjyCFEVTFYqoSmgtw52HSVqSAzh/FPUsFthfEgFgpE9TfPYOBgKsiYFH7jJASVjFgqTNknQX3zQ5gSecBWfaDeCzP5uEuBmhyDhGIK1RBGZOeFKUWzBmCXShFStmdpHBQTuCkksp/ADSETLLCQc2QJG8pgrptPjSBjCYeK9UkadEMLpKlQxkLNGO6SGGOh9wgQFSn+MU4eH/gRMFc9sA5nB2hWuMsfNBZqyPdD46FLWoDP30NHXlPptMUUaXdjnfK8+ymzt/4jfubGk2l2xRbxkxcQ4w4s0Z++Fblt++oGhX5untOGTbVJRPaSbTUdy7b6Pg11RkafkxlLV8OImgvXWbWlAq5LVyBv8o1Y4aLsvOvXa0PLl5fESLF4akAZPS74waTI2e/Ip/xfsV2KJ50A2+ahjaRoMQvq1MaekxBi+p3+YX1sxuWsKaOi2IZDrY53Ny+9vPClDmlobeNcY9t29C9NcbvgSXC3/xhoyz4jmuK61WXJ97+/gApmd6aM9K0mFg5ynIavc0v9rtPQPp0wgZjwPO2Q7Fm5le5HcaAKnLgG9fMjt/b3v6CmG+3Y5TFTyW7EknPv8nToog1zDSXZLVjD7G1CbP9jh59vJ8WGT/RLTzclGWJO0i7t5ZYX9Gb5jUTsOs9huQsp/56vZsakmq1FuH5ZVKtCH64sgQk+bDmMJvUvSx4qXH2aD/XvH1TOpcdubSe+MODXhy9EXVviRz106yV+2XNT2cKjoLjyF2YmuaU/A3uWKvmCpQuPUz2yCKZT86JS/fEFC+5D2ZV91g1Mid6NPphHFSOlCX5sOrGll+3WE7ze9vidS1DiXXQ2V3yttS52U2W6rb0u2E7eNZalTKKUyjh7xpQFG1noBZQSqvV3sPYNVOvhDt4tLKJaf4pG7wmUUK1vGVWqSlWpKlWlqlSVqlJVqkpVqSpVpapUlapSVapKVam2UlnGrxb7NYH8D8V7RJYfb+gXAAAAAElFTkSuQmCC'
          }
    },
    background:{
        src: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa_IcXMqekLOf7_JxSXJz735nDKiv5W6tj9g&usqp=CAU'
          }
    },
    nome:{
        type: String,
        required: true
    },
    usuario:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    }
})

usuarioSchema.pre("save", async function (next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario