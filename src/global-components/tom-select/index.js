
import TomSelect from 'tom-select'
import $ from 'cash-dom'


const setValue = (el, props) => {
  if (props.modelValue) {
    if (props.modelValue.length) {
      $(el).val(props.modelValue); 
    }
  }
};

const init = (el, emit, computedOptions) => {
  el.TomSelect = new TomSelect(el, computedOptions)
  el.TomSelect.on('change', function(selectedItems) {
    emit('update:modelValue', selectedItems)
  })
}


const reInit = (el, props, emit, computedOptions) => {
  el.TomSelect.destroy();
  $(el).html(
    $(el)
      .prev()
      .html()
  );
  setValue(el, props);
  init(el, emit, computedOptions);
};
export { setValue, init, reInit }
