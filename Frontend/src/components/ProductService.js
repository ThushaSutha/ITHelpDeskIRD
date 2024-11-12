const ProductService = {
    // Simulate an API call to fetch products
    getProducts: async () => {
        // Static data for testing
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        name: 'Product 1',
                        image: 'path/to/image1.jpg',
                        description: 'Description of Product 1',
                        category: 'Category 1',
                        price: 100,
                        quantity: 10,
                        rating: 4.5,
                        inventoryStatus: 'INSTOCK'
                    },
                    {
                        id: 2,
                        name: 'Product 2',
                        image: 'path/to/image2.jpg',
                        description: 'Description of Product 2',
                        category: 'Category 2',
                        price: 200,
                        quantity: 5,
                        rating: 4.0,
                        inventoryStatus: 'LOWSTOCK'
                    },
                    // Add more products as needed
                ]);
            }, 1000); // Simulate a delay for data fetching
        });
    },
    // Add more methods (like creating, updating, or deleting products) here
};

export default ProductService;
