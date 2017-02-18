function onLoad() {
    var item = $("current_item");
    var guide = $("sysparm_guide");
    if (item != null && guide != null && item.value == guide.value)
        return;
    g_form.setDisplay('varset', false);
}​
