export type TakeLessonRequest = {
    id: string;
    username: string;
}

export async function takeLesson(requestParams: TakeLessonRequest, retryTimes = 5):Promise<{code: number}> {
    const requestURL = `/api/lessons/take?id=${requestParams.id}&username=${requestParams.username}`;
    try {
        const response = await fetch(requestURL);
        if (response.status === 400) {
            if (retryTimes === 0) {
                return {code: 0}
            }
            return takeLesson(requestParams, retryTimes - 1);
        }
        return await response.json()
    } catch {
    }
    return {code: 0}
}