var libs = {
	portal: require('/lib/xp/portal'),
	contentLib: require('/lib/xp/content'),
	thymeleaf: require('/lib/xp/thymeleaf'),
	util: require('/lib/enonic/util/util')
};
var view = resolve('user-import.html');


exports.get = function(req) {

	var component = portal.getComponent();
	var content = portal.getContent();

	var model = {
		'config': component.config,
		'content': content
	};

    return {
    	body: thymeleaf.render(view, model)
    };

};