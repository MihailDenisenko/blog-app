export const logger = (store) => (action) => (next) => {
  console.log(store.getState())

}


