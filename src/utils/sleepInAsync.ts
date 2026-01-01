export const sleepInAsync = async function (time: number) {
    return await new Promise(resolve => setTimeout(resolve, time));
}