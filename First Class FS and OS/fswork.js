const fs = require("fs")
fs.writeFileSync("worker.html",`<!DOCTYPE html>
<html lang="en">
<head>
<title>First Box Assignment</title>
</head>
<body style="margin: 0px; 
padding: 10px; 
background-color: ghostwhite;">
<div style = "display: flex; 
flex-direction: row; 
gap: 20px;">
    <div style = "width: 90%; 
    height: 900px; 
    display: flex; 
    flex-direction: column; 
    gap: 20px;">
        <div style = "width: 100%; 
        height: 500px; 
        display: flex; 
        flex-direction: row; 
        gap: 20px;">
            <div style = "width: 70%; 
            height: 500px; 
            display: flex; 
            gap: 20px; 
            background-color: yellow;">
            <p>Image 1</p>

            </div>
            <div style = "width: 30%; 
            height: 500px; 
            display: flex; 
            flex-direction: column; 
            gap: 20px;">
                <div style = "width: 100%; 
                height: 60%; display: flex; gap: 20px; background-color: yellow;"><p>Image 2</p>

                </div>
                <div style = "width: 100%; height: 40%; display: flex; flex-direction: column; gap: 20px; background-color: yellow;"><p>Image 3</p>

                </div>
            </div>
        </div>
        <div style = "width: 100%; height: 200px; display: flex; flex-direction: row; gap: 20px;">
            <div style="width: 30%; height: 200px; display: flex; background-color: yellow; gap: 20px"><p>Image 4</p>

            </div>
            <div style="width: 70%; height: 200px; display: flex; flex-direction: row; background-color: yellow; gap: 20px"><p>Image 5</p>

            </div>

        </div>
        <div style = "width: 100%; height: 200px; display: flex; flex-direction: row; gap: 20px;">
            <div style="width: 270px; display: flex; background-color: yellow; gap: 20px;"><p>Image 6</p>
            </div>

            <div style="width: 345px; display: flex; background-color: yellow; gap: 20px;"><p>Image 8</p>
            </div>

            <div style="width: 267px; display: flex; background-color: yellow; gap: 20px;"><p>Image 9</p>

            </div>
        </div>
    </div>

    <div style="width:10%; height:900px; background-color: yellow; margin-top: 0px; display: flex; flex-direction: row; "><p>Image7</p>
    </div>
</div>

</body>


</html>`)
// fs.renameSync("worker.html","bomb.html")
// fs.unlinkSync("bomb.html")