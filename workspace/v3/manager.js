/*
 * Copyright (c) 2018 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 */

var java = require('core/v3/java');

exports.getWorkspace = function(name) {
	var workspaceInstance = java.call('org.eclipse.dirigible.api.v3.workspace.WorkspaceFacade', 'getWorkspace', [name], true);
	var workspace = new Workspace();
	workspace.uuid = workspaceInstance.uuid;
	return workspace;
};

/**
 * Workspace object
 */
function Workspace() {
	
	this.getProjects = function() {
		var projectsInstance = java.invoke(this.uuid, 'getProjects', [], true);
		var projects = new Projects();
		projects.uuid = projectsInstance.uuid;
		return projects;
	};
	
	this.createProject = function(name) {
		var projectInstance = java.invoke(this.uuid, 'createProject', [name], true);
		var project = new Project();
		project.uuid = projectInstance.uuid;
		return project;
	}
	
	this.getProject = function(name) {
		var projectInstance = java.invoke(this.uuid, 'getProject', [name], true);
		var project = new Project();
		project.uuid = projectInstance.uuid;
		return project;
	}
	
	this.deleteProject = function(name) {
		java.invoke(this.uuid, 'deleteProject', [name], true);
	}

}

/**
 * Projects object
 */
function Projects() {
	
	this.size = function() {
		var size = java.invoke(this.uuid, 'size', []);
		return size;
	}
	
}

/**
 * Project object
 */
function Project() {

	this.getName = function() {
		var collectionInstance = java.invoke(this.uuid, 'getInternal', [], true);
		var name = java.invoke(collectionInstance.uuid, 'getName', []);
		return name;
	}
	
}