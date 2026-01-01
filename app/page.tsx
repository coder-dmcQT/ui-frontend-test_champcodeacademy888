import {redirect} from "next/navigation";

export default function Home() {
    console.log('the home page');
    return redirect("/login");
}
