
export const proceeedSale = async (data, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to process sale.');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in proceeedSale:', error.message);
        throw error;
    }
};


export const login = async (data) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
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


export const logoutUser = async (token) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
};


export const deleteProduct = async (id, token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json()).catch((err) => console.log(err));

    return response;
};
