const URL = "https://back.dr-python.center/watchSession/start/";
const startLectureCounter = async (data, setError, lectureId, timerCount, endSession, token) => {
    try {
        const response = await fetch(`${URL}${lectureId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            timerCount()
            endSession(result.sessionId)
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
export default startLectureCounter;