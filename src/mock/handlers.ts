import {http, HttpResponse} from "msw";
import {UserLoginBody, userData, lessonsDataMocked} from "@/src/mock/data";
import {sleepInAsync} from "@/src/utils/sleepInAsync";

export const handlers = [
    http.post("/api/login", async ({request}) => {
        const reqBody = (await request.json()) as UserLoginBody;
        if (reqBody.username === userData.username && reqBody.password === userData.password) {
            return HttpResponse.json({
                code: 200,
                data: {
                    isLoggedIn: true,
                    username: reqBody.username,
                    password: reqBody.password,
                }
            }, {status: 200});
        }
        return HttpResponse.json({
            code: 0,
            error: "username and password not correct! They are both admin!"
        }, {status: 200});
    }),
    http.get("/api/logout", async () => {
        await sleepInAsync(1000)
        return HttpResponse.json({
            code: 200,
            data: null
        }, {status: 200});
    }),
    http.get('/api/lessons', async ({request}) => {
        const url = new URL(request.url);
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        const type = url.searchParams.get('type') || 'Today';

        let dataFilteredFirstByType = lessonsDataMocked.filter(lesson => lesson.type === type);
        if (startDate && endDate) {
            dataFilteredFirstByType = dataFilteredFirstByType.filter(lesson => {
                const lessonDate = new Date(lesson.date);
                return lessonDate >= new Date(startDate) && lessonDate <= new Date(endDate);
            });
        } else if (startDate) {
            dataFilteredFirstByType = dataFilteredFirstByType.filter(lesson => {
                const lessonDate = new Date(lesson.date);
                return lessonDate >= new Date(startDate);
            });
        } else if (endDate) {
            dataFilteredFirstByType = dataFilteredFirstByType.filter(lesson => {
                const lessonDate = new Date(lesson.date);
                return lessonDate <= new Date(endDate);
            });
        }

        return HttpResponse.json({
            code: 200,
            data: dataFilteredFirstByType
        }, {status: 200});
    })
]