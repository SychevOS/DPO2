document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;
        
        console.clear();
        
        console.log('%c📋 Данные отправленной формы', 'font-size: 16px; font-weight: bold; color: #3498db;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db;');
        
        console.log('%c👤 ФИО:', 'font-weight: bold; color: #2c3e50;', formData.name);
        console.log('%c📧 Email:', 'font-weight: bold; color: #2c3e50;', formData.email);
        console.log('%c📞 Телефон:', 'font-weight: bold; color: #2c3e50;', formData.phone);
        console.log('%c💬 Сообщение:', 'font-weight: bold; color: #2c3e50;', formData.message);
        console.log('%c✅ Согласие:', 'font-weight: bold; color: #2c3e50;', formData.agreement ? 'Да' : 'Нет');
        
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db;');
        
        const timestamp = new Date().toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        console.log(`🕒 Отправлено: ${timestamp}`);
        
        console.log('%c📦 Полные данные:', 'font-weight: bold; color: #27ae60;', formData);
        
    });
    
    console.log('%c✅ Logger готов к работе', 'color: #27ae60; font-style: italic;');
});