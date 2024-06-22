# install.packages("keras3")
# install.packages("tensorflow")

# install_tensorflow()

library("keras3")
library("tensorflow")

options(width=1000)
options(digits=3)
options(scippen=999)
par(mai=c(.001,.001,.001,.001),mar=c(.001,.001,.001,.001),oma=c(.001,.001,.001,.001))

# load training and test data
mnist_train <- read.csv("./mnist_train.csv")
train_labels <- as.array(mnist_train[, 1])
train_images <- as.matrix(mnist_train[, -1])

mnist_test <- read.csv("./mnist_test.csv")
test_labels <- as.array(mnist_test[, 1])
test_images <- as.matrix(mnist_test[, -1])



# plot image so we can see it
img <- matrix(train_images[433,], nrow = 28, byrow = TRUE)
plot(as.raster(img,max=255))

# reshape the data
train_images <- array_reshape(train_images, c(nrow(train_images), 28*28))
train_images <- train_images/255
test_images <- array_reshape(test_images, c(nrow(test_images), 28*28))
test_images <- test_images/255
train_labels <- to_categorical(train_labels)
test_labels <- to_categorical(test_labels)

## train
# model<-keras_model_sequential() %>%
#   layer_dense(units=1000,activation="relu",input_shape=c(28*28)) %>%
#   layer_dense(units=1000,activation="relu") %>%
#   layer_dense(units=10,activation="softmax")
# model %>% compile(optimizer="rmsprop",
#                     loss="categorical_crossentropy",
#                     metrics=c("accuracy"))
# model %>% fit(train_images,train_labels,epochs=10,batch_size=784,verbose=0)

# ## evaluate
# model %>% evaluate(test_images, test_labels)

# Define the model
model <- keras_model_sequential() %>%
  layer_dense(units = 512, activation = "relu", input_shape = c(28 * 28)) %>%
  layer_dropout(rate = 0.2) %>%
  layer_dense(units = 512, activation = "relu") %>%
  layer_dropout(rate = 0.2) %>%
  layer_dense(units = 10, activation = "softmax")

# Compile the model
model %>% compile(
  optimizer = optimizer_adam(),
  loss = "categorical_crossentropy",
  metrics = c("accuracy")
)

model %>% fit(train_images,train_labels,epochs=10,batch_size=784,verbose=0)

## evaluate
model %>% evaluate(test_images, test_labels)

## Test
# bit_map <- as.matrix(mnist_test[500, -1])
# test_img <- matrix(bit_map, nrow = 28, byrow = TRUE)
# plot(as.raster(test_img,max=255))

# prediction <- model %>% predict(array_reshape(bit_map, c(1, 28*28)))
# prediction
# predicted_number <- prediction %>% which.max() - 1

# ## you can save the model for later usage
# model %>% save(file="keras_model_mnist.keras")
