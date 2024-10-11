const URL = "https://back.dr-python.center/student/getLectures/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const getAllLecturesAPI = async (setError, setGetLoading, setAllLectures, subjectId) => {
    setGetLoading(true)
    try {
        const response = await fetch(`${URL}${subjectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllLectures(result.lectures)
            setGetLoading(false)
        } else {
            if (response.status == 404) {
                setError(result.message);
                setGetLoading(false)
            } else {
                setError(response.message);
                setGetLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setGetLoading(false)

    }
}
export default getAllLecturesAPI;