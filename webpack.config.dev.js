//es un elemento de node, no hace falta instalar nada
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Agregamos esto para poder usar este plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Agregamos esto para usar el plugin de CSS
const CopyPlugin = require('copy-webpack-plugin'); //Para poder copiar archivos
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js', //Punto de entrada de nuestra aplicacion
    output: {
        path: path.resolve(__dirname, 'dist'), //Donde vamos a enviar lo que va a preparar webpack, __dirname devuelve el path absoluto y dist es la carpeta        
        filename: '[name].[contenthash].js', //nombre del js donde va aplicar webpack     
        assetModuleFilename: 'assets/images/[hash][ext][query]'          
    } ,
    mode: 'development',
    watch: true,
    resolve:{ //con que extensiones vamos a trabajar
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/') ,           
        }
    },
    module:{
        rules: [
            {
                test: /\.m?js$/, // Test declara que extensión de archivos aplicara el loader
                exclude: /node_modules/, // Exclude permite omitir archivos o carpetas especificas
                use:{
                    loader: 'babel-loader' // Use es un arreglo u objeto donde dices que loader aplicaras
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png$/,
                type: 'asset/resource',             
            },
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                  filename: 'assets/fonts/[name][contenthash][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html', //el html que va a transformar
            filename: './index.html' //el nombre final del archivo que lo va a guardar en Dist
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),//aca se encuentran los archivos que vamos a mover
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
}