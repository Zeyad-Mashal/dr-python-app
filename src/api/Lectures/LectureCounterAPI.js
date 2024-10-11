const URL = "https://back.dr-python.center/watchTracking/tracking";

const LectureCounterAPI = async (data, setError, setViewsLoading, setModel, setViewsCount, setStudent, startLectureCounter, timerCount, endSession, token) => {
    setViewsLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            setViewsLoading(false)
            setModel(true);
            setViewsCount(result.watchCount)
            setStudent(result.student)
            const startData = {
                videoUrl: data.videoUrl,
            }
            startLectureCounter(startData, setError, data.lectureId, timerCount, endSession, token);
        } else {
            document.querySelector(".error_popup").style.display = "flex";
            if (response.status == 403) {
                setError(result.message);
                setViewsLoading(false)
            } else if (response.status == 404) {
                setError(response.message);
                setViewsLoading(false)
            } else if (response.status == 400) {
                setError(response.message);
                setViewsLoading(false)
            } else {
                setError(response.message);
                setViewsLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setViewsLoading(false)

    }
}
export default LectureCounterAPI;