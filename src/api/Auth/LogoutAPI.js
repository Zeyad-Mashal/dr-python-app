const URL = "https://back.dr-python.center/user/logout";
const LogoutAPI = async (data, setError) => {
    try {
        const response = await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.removeItem("USER_TOKEN")
            window.location.reload()
        } else {
            if (response.status == 500) {
                setError(result.message);
            } else {
                setError(response.message);
            }
        }
    } catch (error) {
        setError('An error occurred');
    }
}
export default LogoutAPI;