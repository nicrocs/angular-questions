#questions api

require 'webrick'
require 'json'
module WEBrick
  module HTTPServlet
    class ProcHandler
        alias do_PUT    do_GET
        alias do_DELETE do_GET
    end
  end
end

port = ENV['PORT'].nil? ? 3000 : ENV['PORT'].to_i

puts "Server started: http://localhost:#{port}/"

root = File.expand_path './app'
server = WEBrick::HTTPServer.new Port: port, DocumentRoot: root

server.mount_proc '/api/questions' do |req, res|
   path = req.path[1..-1].split('/')
   questions = JSON.parse(File.read('./questions.json', encoding: 'UTF-8'))
   unless path[2].nil?
        id = Integer(path[2])
        questionObj = questions.find { |question| question["id"] == id}
   end

    if req.request_method == 'GET' && id
        res.body = JSON.generate(questionObj)
    else
       res.body = JSON.generate(questions)
    end
  if req.request_method == 'POST'
    obj = JSON.parse(req.body)
    puts obj
    question = { id: (Time.now.to_f * 1000).to_i }
    obj.each do |key, value|
        if key == 'choices'
            question[key] = obj['choices']
        else
        question[key] = value
        end
    end
    questions << question
    File.write(
      './questions.json',
      JSON.pretty_generate(questions, indent: '    '),
      encoding: 'UTF-8'
    )
    res.body = JSON.generate(question)
  end
  if req.request_method == 'PUT'
      questions.delete(questionObj)

      question = JSON.parse(req.body)
      questions << question

      File.write(
        './questions.json',
        JSON.pretty_generate(questions, indent: '    '),
        encoding: 'UTF-8'
      )
      res.body = JSON.generate(question)
    end
  if req.request_method == "DELETE"
    questions.delete(questionObj)
     File.write(
       './questions.json',
       JSON.pretty_generate(questions, indent: '    '),
       encoding: 'UTF-8'
     )
    res.body = JSON.generate(questions)
  end

  # always return json
  res['Content-Type'] = 'application/json'
  res['Cache-Control'] = 'no-cache'
end

trap('INT') { server.shutdown }

server.start
