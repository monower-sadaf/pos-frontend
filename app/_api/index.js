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
    }else{
        return response.json();
    }
};