function Logo(contex) {
    var version = '';

    var logo = 
        '\n' + 

        yellow('        //--------------------\\  \n') +
        green('       //     \\ _____    _____| \\ \n') +
        purple('    //  \\ /  \\\\__  \\  /  ___/ \\ \n') +
        blue('    //    Y    \\/ __ \\_\\___ \\|    <\\ \n') +
        red('   \\____|__(  )  (____  /____ (   ) >__|_ \\ \n') +
        yellow('        ( ||  )            (  ||  )   \n ')      +  '\n\n';


    logo += '\nPlease follow these questions. \n';

    return logo;
}

exports.Logo = Logo;

function consoleColor(str, num) {
    if (!num) {
        num = '32';
    }
    return "\033[" + num + "m" + str + "\033[0m";
}

function green(str) {
    return consoleColor(str, 32);
}

function yellow(str) {
    return consoleColor(str, 33);
}

function red(str) {
    return consoleColor(str, 31);
}

function blue(str) {
    return consoleColor(str, 34);
}

function purple(str) {
    return consoleColor(str, 35);
}
