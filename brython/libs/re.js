$module = (function($B){

    var __builtins__ = $B.builtins

    for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
    var $JSObject = $B.$JSObject
    var JSObject = $B.JSObject

    obj = {__class__:$module,
        __str__: function(){return "<module 're'>"}
    }
    obj.A = obj.ASCII = 256
    obj.I = obj.IGNORECASE = 'i'
    obj.M = obj.MULTILINE = 'm'
    obj.VERBOSE = 64
    $SRE_PatternDict = {
        __class__:$B.$type,
        __name__:'SRE_Pattern'
    }
    $SRE_PatternDict.__mro__ = [$SRE_PatternDict,object.$dict]
    $SRE_PatternDict.match = function(self,string){
        return obj.match(self.pattern,string,self.flags)
    }
    $SRE_PatternDict.search = function(self,string){
        return obj.obj(self.pattern,string,self.flags)
    }
    obj.compile = function(pattern,flags){
        return {
            __class__:$SRE_PatternDict,
            pattern:pattern,
            flags:flags
        }
    }
    obj.escape = function(string){
        // Escape all the characters in pattern except ASCII letters, numbers 
        // and '_'. This is useful if you want to match an arbitrary literal 
        // string that may have regular expression metacharacters in it.
        var res = ''
        var ok = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'
        for(var i=0;i<string.length;i++){
            if(ok.search(string.charAt(i))>-1){res += string.charAt(i)}
        }
        return res
    }
    obj.findall = function(pattern,string,flags){
        var $ns=$B.$MakeArgs('re.search',arguments,['pattern','string'],[],'args','kw')
        var args = $ns['args']
        if(args.length>0){var flags=args[0]}
        else{var flags = getattr($ns['kw'], 'get')('flags','')}
        flags += 'gm'
        var jsp = new RegExp(pattern,flags)
        var jsmatch = string.match(jsp)
        if(jsmatch===null){return []}
        return jsmatch
    }
    obj.search = function(pattern,string){
        var $ns=$B.$MakeArgs('re.search',arguments,['pattern','string'],[],'args','kw')
        var args = $ns['args']
        if(args.length>0){var flags=args[0]}
        else{var flags = getattr($ns['kw'],'get')('flags','')}
        var jsp = new RegExp(pattern,flags)
        var jsmatch = string.match(jsp)
        if(jsmatch===null){return None}
        var mo = new Object()
        mo.group = function(){
            var res = []
            for(var i=0;i<arguments.length;i++){
                if(jsmatch[arguments[i]]===undefined){res.push(None)}
                else{res.push(jsmatch[arguments[i]])}
            }
            if(arguments.length===1){return res[0]}
            return tuple(res)
        }
        mo.groups = function(_default){
            if(_default===undefined){_default=None}
            var res = []
            for(var i=1;i<jsmatch.length;i++){
                if(jsmatch[i]===undefined){res.push(_default)}
                else{res.push(jsmatch[i])}
            }
            return tuple(res)
        }
        mo.start = function(){return jsmatch.index}
        mo.string = string
        return JSObject(mo)
    }
    obj.sub = function(pattern,repl,string){
        var $ns=$B.$MakeArgs('re.search',arguments,['pattern','repl','string'],[],'args','kw')
        for($var in $ns){eval("var "+$var+"=$ns[$var]")}
        var args = $ns['args']
        var count = __builtins__.dict.$dict.get($ns['kw'],'count',0)
        var flags = __builtins__.dict.$dict.get($ns['kw'],'flags','')
        if(args.length>0){var count=args[0]}
        if(args.length>1){var flags=args[1]}
        if(typeof repl==="string"){
            // backreferences are \1, \2... in Python but $1,$2... in Javascript
            repl = repl.replace(/\\(\d+)/g,'$$$1')
        }else if(typeof repl==="function"){
            // the argument passed to the Python function is the match object
            // the arguments passed to the Javascript function are :
            // - the matched substring
            // - the matched groups
            // - the offset of the matched substring inside the string
            // - the string being examined
            var $repl1 = function(){
                var mo = Object()
                mo.string = arguments[arguments.length-1]
                var start = arguments[arguments.length-2]
                var end = start + arguments[0].length
                mo.start = function(){return start}
                mo.end = function(){return end}
                groups = []
                for(var i=1;i<arguments.length-2;i++){groups.push(arguments[i])}
                mo.groups = function(_default){
                    if(_default===undefined){_default=None}
                    var res = []
                    for(var i=0;i<groups.length;i++){
                        if(groups[i]===undefined){res.push(_default)}
                        else{res.push(groups[i])}
                    }
                    return res
                }
                return repl(JSObject(mo))
            }
        }
        if(count==0){flags+='g'}
        var jsp = new RegExp(pattern,flags)
        if(typeof repl==='function'){return string.replace(jsp,$repl1)}
        else{return string.replace(jsp,repl)}
    }
    obj.match = (function(search_func){
        return function(){
            // match is like search but pattern must start with ^
            pattern = arguments[0]
            if(pattern.charAt(0)!=='^'){pattern = '^'+pattern}
            var args = [pattern]
            for(var i=1;i<arguments.length;i++){args.push(arguments[i])}
            return search_func.apply(null,args)
        }
    })(obj.search)

    return obj
}
)(__BRYTHON__)
