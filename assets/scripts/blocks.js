$(document).ready(function() {
    $("#runBtn").click(function() {
        runcode();
    });
    $("#resetBtn").click(function() {
        reset();
    });
});

Blockly.Blocks["example_input_text"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Example Block:")
            .appendField(new Blockly.FieldTextInput("write here..."), "input");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.Blocks["print"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("print")
            .appendField(new Blockly.FieldTextInput("write here..."), "input");
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setOutput(true, null);
        this.setColour(75);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

Blockly.Blocks["text"] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("write here..."), "input");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, null);
        this.setColour(30);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.Blocks['bot'] = {
    init: function() {
        this.appendValueInput("questioon_input")
            .appendField("Bot input :")
            .setCheck("String");
        this.setInputsInline(false);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Bot");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['if'] = {
    init: function() {
        this.appendValueInput("res")
            .appendField("If ")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(195);
        this.setTooltip("Bot");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['else_if'] = {
    init: function() {
        this.appendValueInput("cond")
            .appendField("else if ")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(195);
        this.setTooltip("Bot");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['else'] = {
    init: function() {
        this.appendValueInput("cond")
            .appendField("else ")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(195);
        this.setTooltip("Bot");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['cond'] = {
    init: function() {
        this.appendValueInput("input==")
            .appendField("input ==")
            .setCheck(null);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(195);
        this.setTooltip("Bot");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['then'] = {
    init: function() {
        this.appendValueInput("then")
            .appendField("then")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(295);
        this.setTooltip("Then");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['ask_me_a_question'] = {
    init: function() {
        this.appendValueInput("Ask a question")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([
                ["What is the date today ?", "What is the date today?"],
                ["What is the time now ?", "What is the time now?"],
                ["How are you ?", "How are you?"],
                ["What is JavaScript ?", "What is JavaScript ?"],
                ["What is your name ?", "What is your name ?"]
            ]), "question_is")
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(120);
        this.setTooltip("Ask a Question");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript["ask_me_a_question"] = function(block) {
    var text_input = block.getFieldValue("question_is");
    // alert("${question_input}");
    var res = " Invalid Question ?"
    if (text_input == "What is the date today?") {
        //CurrentDate();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        res = mm + '/' + dd + '/' + yyyy;

    } else if (text_input == "What is the time now?") {
        //CurrentTime();
        var today = new Date();
        res = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    } else if (text_input == "How are you?") {
        res = "I am doing fine. Thanks for asking"
    } else if (text_input == "What is JavaScript ?") {
        res = "JavaScript is the Programming Language for the Web. JavaScript can update and change both HTML and CSS.JavaScript can calculate, manipulate and validate data"
    } else if (text_input == "What is your name ?") {
        res = "My name is CuriousJr Bot"
    }

    $("#inputBox").text(res);
    var code = "var inputTextValue = '" + res.toString() + "';";
    return code;
};

var workspace = Blockly.inject("blocklyDiv", {
    media: "assets/media/",
    toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
    if (typeof inputTextValue !== "undefined") {
        $("#inputBox").text(inputTextValue);
    } else {
        $("#inputBox").text("");
    }
}

function runcode() {
    // Generate JavaScript code and run it.
    var geval = eval;
    try {
        geval(Blockly.JavaScript.workspaceToCode(workspace));
    } catch (e) {
        console.error(e);
    }
    redrawUi();
}

function reset() {
    delete inputTextValue;
    redrawUi();
    windows.location.reload();
}