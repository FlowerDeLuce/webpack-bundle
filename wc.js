rules: [
      {
        test: /node_modules(\/cesium\/||\/better-npm-run\/)index\.js$/,
        use: [
          {
            loader: 'shebang-loader',
          },
        ],
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        use: [
          {
            loader: 'babel-loader',
            query: options.babelQuery,
          },
          {
            loader: 'shebang-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(eot|svg|png|ttf|woff|woff2|jpg)$/,
        use: [{
          loader: 'file-loader',
        }],
      },
      {
        test: /\.(gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
        }],
      },
      {
        test: /\.(mp4|webm)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000,
          },
        }],
      }]



const jsList = fs.readdir( __dirname, '/src/js')
entry: [jsList ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    removeAvailableModules: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minChunks: 2,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },