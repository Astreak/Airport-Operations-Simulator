var checkMiddle = (res:any, req: any, next:any) => {
    console.log(res.body);
    let ok = 2;
    if (ok == 2) next();
    else return;
}
var anotherMiddle = (res: any, req: any, next: any) => {
    console.log("OK");
    next();
}
export { checkMiddle, anotherMiddle };