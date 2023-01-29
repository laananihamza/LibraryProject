import styled from "styled-components";
function AddAudio() {
    // function handleSubmit(event) {
    //     event.preventDefault()
    //     const url = 'http://localhost:3000/uploadFile';
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('fileName', file.name);
    //     const config = {
    //       headers: {
    //         'content-type': 'multipart/form-data',
    //       },
    //     };
    //     axios.post(url, formData, config).then((response) => {
    //       console.log(response.data);
    //     });
    
    //   }
    const Main = styled.main`
        width: calc(100% - 355px);
        float: left;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 0 10px 0px #cccccc69;
        margin-top: 25px;
        margin-left: 10px;
        padding: 15px;
        @media (max-width: 1200px) {
            width: calc(100% - 280px);
        }
        @media (max-width: 900px) {
                width: calc(100% - 110px);
        }
    `;
    const HeadTiltle = styled.div`
        width: 100%;
        border-bottom: 1px solid #dddddd59;
    `;
    const Label = styled.label`
        display: block;
        margin: 10px 0;
        font-size: 17px;
    `;
    const Input = styled.input`
        padding: 10px;
        width: 95%;
        border-radius: 4px;
        border: 1px solid #eee;
        display: block;
        font-size: 17px;
        &::placeholder {
            background-color: #ffffff;
            color: #777d74;
            font-size: 18px;
        }
        &:focus {
            outline: none;
            border: 1px solid #ddd;
        }
        &[type=file] {
            position: relative;
            
        }
        &[type=file]::-webkit-file-upload-button {
            visibility: hidden;

        }
        &::before {
            content: 'Browser';
            position: absolute;
            background: #ddd;
            height: calc(100% - 6px);
            border-radius: 3px;
            padding: 5px 8px;
            outline: none;
            white-space: nowrap;
            -webkit-user-select: none;
            cursor: pointer;
            font-weight: 700;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            top: -4px;
            left: 0;
        
          }
    `;
    const TextArea = styled.textarea`
        padding: 10px;
        width: 95%;
        height: 250px;
        border-radius: 4px;
        border: 1px solid #eee;
        display: block;
        font-size: 17px;

        &:focus {
            outline: none;
            border: 1px solid #ddd;
        }
    `
    const Add = styled.button`
        background-color: #05d5b4;
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        font-size: 17px;
        color: #ffffff;
        margin: 10px 5px;
        
        transition: .2s;
        &:hover {
            background-color: #03c4a6;

        }
        `
    const Reset = styled.button`
        background-color: #f5674fc2;
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        font-size: 17px;
        color: #ffffff;
        margin: 10px 5px;
        transition: .2s;
        &:hover {
            background-color: #f5674f;

        }
        `
    return ( 
        <>
            <Main>
                <HeadTiltle><h3>اضافة صوت</h3></HeadTiltle>
                <form action="">
                    <Label htmlFor="Aname">اسم الصوت</Label>
                    <Input type='text' id="Aname" placeholder='اسم الصوت' />
                    <Label htmlFor="CAook">صنف الصوت</Label>
                    <Input type='text' id="CAook" placeholder='صنف الصوت' />
                    <Label htmlFor="Aname">صاحب الصوت</Label>
                    <Input type='text' id="Aname" placeholder='صاحب الصوت' />
                    <Label htmlFor="Aimage">صورة الصوت</Label>
                    <Input type='file' id="Aimage" accept="image/png, image/jpg, image/jpge" />
                    <Label htmlFor="Apdf">ملف الصوت</Label>
                    <Input type='file' id="Apdf" accept="application/mp3" onChange={(e) => console.log(e.target.value)} />
                    <Label>وصف للصوت</Label>
                    <TextArea></TextArea>
                    <Add type="submit">أضف</Add>
                    <Reset type="reset">مسح</Reset>
                </form>
            </Main>
        </>
     );
}

export default AddAudio;