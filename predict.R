# call the model and predict the number
#* Process data received in a POST request
#* @post /predict
function(req, res) {
  # Access the request body
  body <- req$body
 
  prediction <- model %>% predict(array_reshape(body$value, c(1, 28*28)))
  print(prediction)
  # # Return a response
  response <- list(data = prediction)

  # # Set the response status code (optional)
  res$status <- 201 # Created

  # # Return the response as JSON
  return(response)
}
