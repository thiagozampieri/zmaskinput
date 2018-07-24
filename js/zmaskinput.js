/**
 * Created by thiagozampieri on 17/10/17.
 */

var ctrlDown = false,
    ctrlKey = 17,
    cmdKey = 91,
    aKey = 65,
    vKey = 86,
    cKey = 67;

_zi = function (selector) {
    tag = document.querySelector(selector);
    return tag;
}

function is_numeric(str) {
    return /^\d+$/.test(str);
}

HTMLElement.prototype.zMaskInput = function (mask) {
    function constructor () {
        //super();
    }

    this.masked = mask;
    this.len1 = 0;
    this.len2 = 0;
    this.curinga = 0;

    this.onkeydown = function (e) {
        if (e.target.selectionStart != e.target.selectionEnd){
            this.value = this.value.substring(0, e.target.selectionStart)+this.value.substring(e.target.selectionEnd, this.value.length);
        }

        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
        if (ctrlDown) {
            if(e.keyCode == aKey || e.keyCode == vKey || e.keyCode == cKey) return true;
        }

        if (e.key != "Backspace" & e.key != "ArrowRight" & e.key != "ArrowLeft" & e.key != "ArrowUp"
            & e.key != "ArrowDown" & e.key != "Enter" & e.key != "Tab" & e.key != "Delete") {
            if (!is_numeric(e.key)) return false;

            if ((this.value.length+1) > (e.srcElement.len1)) return false;
        }
    }

    this.onfocus = function () {
        //console.log("entrou");
        for (var i = this.value.length; i >= 0; i--) {
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
        for (var i = this.masked.length; i >= 0; i--) {
            if (this.masked[i]) {
                if (is_numeric(this.masked[i]) === true | this.masked[i] == '?') {
                    this.len1++;
                    if (this.masked[i] == '?') this.curinga++;
                } else {
                    this.len2++;
                }

            }
        }

        this.maxLength = (this.masked.length * 1.3) - this.len2;
    }

    this.onblur = function () {
        this.setAttribute('data-invalid', "false");
        //console.log("saiu");
        var tempValue = "";
        for (var i = this.value.length; i >= 0; i--) {
            if (this.value[i]) {
                if (is_numeric(this.value[i])) {
                    tempValue = this.value[i] + "" + tempValue;
                }
            }
        }
        this.value = tempValue;

        if (this.value == "") return false;
        var text = "";
        var i2 = 0;
        for (var i = 0; i < this.masked.length; i++) {
            var char1 = this.value[i2];
            var char2 = this.masked[i];

            if (char2 == '?') {
                if ((this.value.length + this.len2) == this.masked.length) {
                    i--;
                    i2++;
                    text += char1;
                    this.len2--;
                }
            } else {
                if (is_numeric(char2)) {
                    i2++;
                    char1 = (is_numeric(char1)) ? char1 : null;
                    if (char1 == null && this.value != ""){
                        this.value = text;
                        this.setAttribute('data-invalid', "true");
                        return this;
                    }
                    text += char1;
                }
                else {
                    text += char2;

                }
            }
        }

        this.value = ((text.length + this.curinga) >= this.masked.length) ? text : "";
        //this.value = text;
    }

    if (this.value.trim() != "") this.focus();

    return this;
};

HTMLElement.prototype.zMaskInputPhone = function () {
    this.onkeydown = function (e) {
        if (e.target.selectionStart != e.target.selectionEnd){
            this.value = this.value.substring(0, e.target.selectionStart)+this.value.substring(e.target.selectionEnd, this.value.length);
        }

        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
        if (ctrlDown) {
            if(e.keyCode == aKey || e.keyCode == vKey || e.keyCode == cKey) return true;
        }

        if (e.key === "0" && this.value.length == 0) return false;
        if (e.key != "Backspace" & e.key != "ArrowRight" & e.key != "ArrowLeft" & e.key != "ArrowUp"
            & e.key != "ArrowDown" & e.key != "Enter" & e.key != "Tab" & e.key != "Delete") {
            if (!is_numeric(e.key)) return false;

            if ((this.value.length+1) > (e.srcElement.len1)) return false;
        }
    }

    return this;
}