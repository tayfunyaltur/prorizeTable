import { Request, Response } from "express";
import { users } from "./mock-datasource";
import { mapToTableResponse } from "./utils/mapper.util";
import { User } from "./types/users.type";
import _ from 'lodash'

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();


const app = express();
const port = process.env.PORT || "8080";


app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("Server is up and running");
});

app.get("/api/users", (req: Request, res: Response) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const page = Number(url.searchParams.get("page") ?? "1") - 1;
    const limit = Number(url.searchParams.get("limit") ?? "11");
    const nameFilters = url.searchParams.getAll("name[]") ?? "";
    const emailFilters = url.searchParams.getAll("email[]") ?? "";
    const city = url.searchParams.getAll("city[]") ?? "";
    const address = url.searchParams.getAll("address[]") ?? "";
    const minAge = url.searchParams.get("minage") ?? "";
    const maxAge = url.searchParams.get("maxage") ?? "";

    //Sorting Options
    const sort = url.searchParams.get("sort") ?? "id,asc";
    const sortingOptions = sort.split("+");
    let sortings = {
        names: sortingOptions.flatMap(item => item.split(",")[0]),
        directions: sortingOptions.flatMap(item => item.split(",")[1] || "asc") as Array<"asc" | "desc">
    }
    let _users = _.orderBy([...users], [...sortings.names], [...sortings.directions]);

    if (nameFilters.length > 0)
        _users = _.filter(_users, (user: User) => nameFilters.some((name: string) => user.name.toLowerCase().includes(name.toLowerCase())));
    if (emailFilters.length > 0)
        _users = _.filter(_users, (user: User) => emailFilters.some((emai: string) => user.email.toLowerCase().includes(emai.toLowerCase())));
    if (city.length > 0)
        _users = _.filter(_users, (user: User) => city.some((c: string) => user.city.toLowerCase().includes(c.toLowerCase())));
    if (address.length > 0)
        _users = _.filter(_users, (user: User) => address.some((a: string) => user.address.toLowerCase().includes(a.toLowerCase())));
    if (minAge)
        _users = _users.filter((user: User) => user.age >= Number(minAge));
    if (maxAge)
        _users = _users.filter((user: User) => user.age <= Number(maxAge));

    //ResponseMapping
    const response = mapToTableResponse<User>(_users.slice(page * limit, (page + 1) * limit), Math.ceil(_users.length / limit))
    setTimeout(() => {
        res.status(200).send(response);
    }, 1000)
});



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});