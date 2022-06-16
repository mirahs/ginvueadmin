#!/bin/bash
DIR_ROOT="$(dirname $(readlink -f $0))/"


fun_start()
{
	chmod +x ./ginadmin

	fileLog="${DIR_ROOT}app.log"

	fileStart="./start.sh"
    cmdStart="./ginadmin -mode test"

    cat > ${fileStart} <<EOF
#!/bin/bash
${cmdStart}
EOF
	chmod +x ${fileStart}
	screen -dmSL ginadmin -t ${fileLog} -s ${fileStart}
	sleep 3
	rm -f ${fileStart}
}

fun_shell()
{
	screen -r ginadmin
}


fun_help()
{
    echo 'start 			启动服务器'
    echo 'shell 			连接服务器终端'

    exit 1
}



if [ $# -eq 0 ]
then
	fun_help
else
	fun_$1 $*
fi

exit 0
