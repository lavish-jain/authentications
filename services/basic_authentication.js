const authenticate = async (header_value, data) => {
  try {
    const encoded_value = header_value.split(" ")[1];
    const encoded_buffer = Buffer.from(encoded_value, "base64");
    const decoded_value = encoded_buffer.toString();
    const username = decoded_value.split(":")[0];
    const password = decoded_value.split(":")[1];
    for (let key in data) {
      if (data[key].username === username) {
        if (data[key].password === password)
          return {
            first_name: data[key].first_name,
            last_name: data[key].last_name,
            age: data[key].age,
          };
        throw "Incorrect username/password";
      }
    }
    throw "User does not exists";
  } catch (err) {
    throw err;
  }
};

module.exports = authenticate;
