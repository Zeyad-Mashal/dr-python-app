const URL = "https://back.dr-python.center/watchSession/end/";

const endLectureCounter = async (setError, sessionId, token) => {
    try {
        const response = await fetch(`${URL}${sessionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${token}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            console.log("end");
            console.log(result.message);
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
export default endLectureCounter;