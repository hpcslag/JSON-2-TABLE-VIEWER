var filepath = process.argv[2];

if(!!filepath){
	var fs = require("fs");
	var path = require("path");

	fs.readFile(path.join(__dirname,filepath),function(err,doc){
		if(err){
			console.log("File not found.");
		}else{
			var json_array = JSON.parse(doc);
			var traversal_keys = {};
			for(var i = 0;i<json_array.length;i++){
				var json_object = json_array[i];
				for(var KEYS_I = 0;KEYS_I<Object.keys(json_object).length;KEYS_I++){
					var key_name = Object.keys(json_object)[KEYS_I];
					if(traversal_keys[key_name] == null){
						traversal_keys[key_name] = [];
					}
				}
			}

			var html = "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Document</title><!-- Latest compiled and minified CSS --><link rel=\"stylesheet\" href=\"https:\/\/maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css\" integrity=\"sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7\" crossorigin=\"anonymous\"><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css\" integrity=\"sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r\" crossorigin=\"anonymous\"></head><body style=\"font-family: 'Noto Sans CJK TC';\">";
			var table = "";
			table = table.concat("<table class=\"table table-bordered\" border=\"1\"><tbody>");
			var title_tr = "<tr>";
			var content_tr = "";
			for(var KEYS_I = 0;KEYS_I<Object.keys(traversal_keys).length;KEYS_I++){
				var key_name = Object.keys(traversal_keys)[KEYS_I];
				title_tr = title_tr.concat("<th>"+ key_name +"</th>");
				content_tr = content_tr.concat("<tr>");
				for(var i = 0;i<json_array.length;i++){
					content_tr = content_tr.concat("<td>");
					var json_object = json_array[i];
					var push_value = json_object[key_name] == null ? null : json_object[key_name];
					traversal_keys[key_name].push(push_value);
					content_tr = content_tr.concat(push_value + "</td>");
				}
				content_tr = content_tr.concat("</tr>");
			}
			title_tr = title_tr.concat("</tr>");
			table = table.concat(title_tr + content_tr);
			table = table.concat("</table></tbody>");

			html += table;
			html += ("<script src=\"https://code.jquery.com/jquery-2.2.3.min.js\" integrity=\"sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=\" crossorigin=\"anonymous\"></script><script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js\" integrity=\"sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS\" crossorigin=\"anonymous\"></script>");
			html += ("</body></html>");

			var NewFileName = filepath.substr(0, filepath.lastIndexOf(".")) + ".html";
			var ws = fs.createWriteStream(NewFileName);
			ws.write(html);
			ws.end();
		}
	});

}else{
	console.log("Please give a JSON file path before run index.js, argument is undefined! \n \n Example: node index.js JSON_DATA.json");
}
