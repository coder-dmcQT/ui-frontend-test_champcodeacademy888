export type GetLessonsRequestParams = {
    type: 'Historic' | 'Upcoming' | 'Available' | 'Today',
    startDate?: Date,
    endDate?: Date,
    [key: string]: unknown
}

export type LessonDataItem = {
    id: string, date: string, type: string, subject: string, students: string[], status: string
}

export async function getLessons(requestParams: GetLessonsRequestParams, retryTimes = 5):Promise<LessonDataItem[]> {
    let requestURL = '/api/lessons';
    const params = Object.keys(requestParams).reduce((q, w: string) => {
        if (requestParams[w]) {
            q.push(`${w}=${encodeURIComponent(requestParams[w] as string)}`);
        }
        return q;
    }, [] as string[])
    if (params.length > 0) {
        requestURL += '?' + params.join('&');
    }

    try {
        const response = await fetch(requestURL, {});
        if (response.status === 404) {
            if (retryTimes === 0) {
                return []
            }
            return getLessons(requestParams, retryTimes - 1);
        }
        const dataResp = await response.json();
        return dataResp.data;
    } catch {

    }
    return []
}