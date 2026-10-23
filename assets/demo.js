for(const button of document.querySelectorAll('[data-answer]'))button.addEventListener('click',()=>{
 const feedback=document.getElementById('demo-feedback');
 for(const other of document.querySelectorAll('[data-answer]'))other.setAttribute('aria-pressed',String(other===button));
 feedback.textContent=feedback.dataset[button.dataset.answer];feedback.dataset.state=button.dataset.answer;
});
