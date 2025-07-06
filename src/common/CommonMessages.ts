interface commonMessageInterface {
    selectOptionBase:string,
    endMessage:string,
    selectOption(userName?:string):string
}


export const commonMessag:commonMessageInterface = {
    selectOptionBase: "Seleccione un número del menú✅💬",
    endMessage:"¡Hasta la próxima👋",
    selectOption: function(userName?:string):string{
        if(userName){
            return `${userName}, ${this.selectOptionBase}`;
        }else{
            return this.selectOptionBase;
        }
    }

}