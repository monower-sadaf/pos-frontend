
export const proceeedSale = async (data) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/pos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to process sale.');
    } else {
        return response.json();
    }
};

export const login = async (data) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.json();
};


export const getProducts = async (token) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products.');
    }
    return response.json();
};
