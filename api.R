# install.packages("plumber")
library(plumber)


pr("predict.R") %>% pr_run(port=8085)
