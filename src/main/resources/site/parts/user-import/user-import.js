var libs = {
	portal: require('/lib/xp/portal'),
	contentLib: require('/lib/xp/content'),
	thymeleaf: require('/lib/xp/thymeleaf'),
	auth: require('/lib/xp/auth'),
	util: require('/lib/enonic/util/util')
};
var view = resolve('user-import.html');

var log = libs.util.log;

exports.get = function(req) {

	var component = libs.portal.getComponent();
	var content = libs.portal.getContent();

	var groups = libs.auth.findPrincipals({
			type: 'group',
			userStore: 'user-store',
			start: 0,
			count: 100
		});

	if ( groups ) {
		log(groups);
	}

	var model = {
		'config': component.config,
		'content': content,
		'groups': groups
	};

    return {
    	body: libs.thymeleaf.render(view, model)
    };

};