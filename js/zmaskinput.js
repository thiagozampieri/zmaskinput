/**
 * Created by thiagozampieri on 17/10/17.
 */
_zi = function(selector)
{
    tag = document.querySelector(selector);
    return tag;
}

HTMLElement.prototype.zMaskInput = function(mask) {

    this.masked = mask;
    this.len1 = 0;
    this.len2 = 0;
    this.curinga = 0;
    function is_numeric(str){
        return /^\d+$/.test(str);
    }

    this.onkeydown = function (e){
        //console.log(e);
        if (e.key != "Backspace" & e.key != "ArrowRight" & e.key != "ArrowLeft" & e.key != "ArrowUp"
            & e.key != "ArrowDown" & e.key != "Enter" & e.key != "Tab" & e.key != "Delete") {
            if (!is_numeric(e.key)) return false;
        }
    }

    this.onfocus = function()
    {
        console.log("entrou");
        for (var i = this.value.length; i>=0; i--) {
            if (this.value[i]) {
                if (!is_numeric(this.value[i])) {

                    if (this.value[i] == "/") this.value[i] = "";
                    if (this.value[i] == "(") this.value[i] = "";

                    this.value = this.value.replace(this.value[i], "");
                }
            }
        }
        this.len1 = 0;
        this.len2 = 0;
        this.curinga = 0;
        for (var i = this.masked.length; i>=0; i--) {
            if (this.masked[i]) {
                if (is_numeric(this.masked[i]) === true | this.masked[i] == '?') {
                    this.len1++;
                    if(this.masked[i] == '?') this.curinga++;
                } else {
                    this.len2++;
                }

            }
        }

        this.maxLength = this.masked.length-this.len2;
    }

    this.onblur = function()
    {
        console.log("saiu");
        if (this.value == "") return false;

        var text = "";
        var i2 =0;
        for (var i = 0; i<this.masked.length; i++) {
            var char1 = this.value[i2];
            var char2 = this.masked[i];

            if(char2 == '?') {
                if ((this.value.length+this.len2) == this.masked.length)
                {
                    i--;
                    i2++;
                    text += char1;
                    this.len2--;
                }
            } else {
                if (is_numeric(char2)) {
                    i2++;
                    char1 = (is_numeric(char1)) ? char1 : 0;
                    text += char1;
                }
                else {
                    text += char2;

                }
            }
        }
        this.value = ((text.length+this.curinga) >= this.masked.length) ? text : "";
        //this.value = text;
    }
};