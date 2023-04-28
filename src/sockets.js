import { getProducts, createProduct, deleteProduct  } from './controllers/productsController.js';

export const ioSocket = (io) => {
    io.on('connection', socket =>{
        console.log("Cliente conectado");
        const emitProducts = async() => {
            const products = await getProducts()
            io.emit('server:loadProducts', products)
        } 
        emitProducts()
        
        socket.on('client:addProduct', async (data) =>{
            await createProduct(data)
        })

        socket.on('client:deleteProduct', async (data) => {
            await deleteProduct(data)
           
        })
    })
} 