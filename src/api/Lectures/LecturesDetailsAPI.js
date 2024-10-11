const URL = "https://back.dr-python.center/student/lectureDetails/";
const LecturesDetailsAPI = async (setError, setGetLoading, setLectureDetails, subjectId, lectureId, setImage, token) => {
    setGetLoading(true)
    try {
        const response = await fetch(`${URL}${subjectId}/${lectureId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${token}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setLectureDetails(result.lecture)
            setGetLoading(false)
            setImage(result.image)

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
export default LecturesDetailsAPI;