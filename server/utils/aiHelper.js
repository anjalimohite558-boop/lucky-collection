export const generateAIData = (productName) => {
  const name = productName.toLowerCase();

  let category = "Other";
  let tags = [];
  let description = "";

  // SAREE
  if (name.includes("saree")) {
    category = "Saree";

    tags = ["women", "traditional", "fashion", "ethnic"];

    description =
      "Beautiful saree with elegant traditional design suitable for festivals and special occasions.";
  }

  // SHIRT
  else if (name.includes("shirt")) {
    category = "Shirt";

    tags = ["men", "casual", "cotton", "fashion"];

    description =
      "Stylish shirt made with comfortable fabric perfect for casual and formal wear.";
  }

  // JEANS
  else if (name.includes("jeans")) {
    category = "Jeans";

    tags = ["denim", "fashion", "casual"];

    description =
      "Premium quality jeans with modern fitting and stylish appearance.";
  }

  // KURTI
  else if (name.includes("kurti")) {
    category = "Kurti";

    tags = ["women", "ethnic", "traditional"];

    description =
      "Elegant kurti designed for comfort and modern traditional fashion.";
  }

  // DEFAULT
  else {
    category = "Fashion";

    tags = ["fashion", "clothing"];

    description =
      "Trendy fashion product designed with quality material and modern style.";
  }

  return {
    category,
    tags,
    description,
  };
};